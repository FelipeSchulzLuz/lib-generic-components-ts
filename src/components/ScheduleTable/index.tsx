import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, TextField, Typography } from "@mui/material";
import { Suspense, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AgendaContext } from '../../../contexts/Agendamento/AgendaProvider';
import { deleteSchedule, getListOfSchedules, verifyKeys } from '../../../service/Schedule.service';
import { listaDeAgendamentosState } from '../../../state/agendamentos/Agendamentos.atom';
import { IScheduleData } from '../../../types/Schedule';
import { getCurrentUserValues } from '../../../utils/auth';
import TabelaDeAgendamentos from "../../GenericTable";
import { TableHeaderObject } from '../../GenericTable/types';
import { StyledButtonBlue } from '../../UI/buttons';
import { StyledTitleCharcoal } from '../../UI/titles';
import { StyledDivHeader, StyledIconButtonTHead, StyledTableItems } from "./styles";

const ScheduleTable = () => {
    const getAtomScheduleList = useRecoilValue(listaDeAgendamentosState);
    const setAtomScheduleList = useSetRecoilState(listaDeAgendamentosState);
    const [searchTicket, setSearchTicket] = useState<string>('');
    const [flag, setFlag] = useState(false);
    const { voucherData }: any = useContext(AgendaContext);
    const navigate = useNavigate();
    const [endereco] = useState(
        "Rod.Contorno Leste - BR 116,8849 | São José dos Pinhais - PR"
    );

    const printPdf = async (object: IScheduleData) => {
        const currentUser = getCurrentUserValues()
        const listSchedulesByTicket = getAtomScheduleList?.filter((agendamento: IScheduleData) => agendamento?.ticket === object?.ticket)
        let listaChaves = [] as string[];

        listSchedulesByTicket?.filter((agendamento: IScheduleData) => agendamento?.ticket === object?.ticket)
            .forEach((item: IScheduleData) => listaChaves?.some((chave: string) => chave === item?.chaveAcesso)
                ? null
                : listaChaves.push(item?.chaveAcesso) && item?.chaveAcesso)


        let arrayAsString = "?" + "chave=" + listaChaves?.join("&chave=");

        const cdDestino = typeof Number(object?.cdDestino) === 'number' ? Number(object?.cdDestino) : 0;

        const res = await verifyKeys(cdDestino, arrayAsString);

        if (res) {
            if (typeof voucherData === 'function') {
                await voucherData(
                    res?.ticket[0],
                    endereco,
                    currentUser?.cnpj,
                    object?.chaveAcesso,
                    currentUser?.inscricao,
                    currentUser?.categoria,
                    object?.cdDestino,
                    "",
                    object?.qtdeVolumes,
                    object?.dataInclusao,
                    res?.qtdeSku,
                    "",
                    res?.qtdeEncontradas,
                    res?.status[0]?.status,
                    object?.transportadora
                );
            }
            navigate("/voucher");
        }
    }

    const callbackList = useCallback(async (ticketNumber?: string | undefined) => {
        if (isNaN(Number(ticketNumber))) {
            setSearchTicket('');
            return toast.error('Informe um ticket válido');
        } else if (Number(ticketNumber) >= 0) {
            const response = await getListOfSchedules(flag ? 1 : 0, typeof Number(ticketNumber) ? Number(ticketNumber) : 0 || 0);
            if (response?.length) return setAtomScheduleList(response);
            else {
                setSearchTicket('');
                toast.error('Não foi encontrado nenhum agendamento com o ticket informado');
            }
        }
    }, [])

    useEffect(() => {
        callbackList("0");
    }, [flag])

    useEffect(() => {
        if (!getAtomScheduleList?.length) callbackList("0");
    }, [getAtomScheduleList]);

    const [headerLine] = useState<TableHeaderObject[]>([
        { label: 'CD Destino', headerKey: 'cdDestino' },
        { label: 'Ticket', headerKey: 'ticket' },
        { label: 'N° XML', headerKey: 'chaveAcesso' },
        { label: 'Volumes', headerKey: 'qtdeVolumes' },
        { label: 'SKUs', headerKey: 'qtdeSku' },
        { label: 'Dt. Inclusão', headerKey: 'dataInclusao' },
        { label: 'Dt. Agendamento', headerKey: 'dataProgramacao' },
        { label: 'Status XML', headerKey: 'statusXml' },
        { label: 'Status Agendamento', headerKey: 'statusAgendamento' },
        { label: 'Motivo da Pendência', headerKey: 'pendencia' },
        { label: 'Setor Responsável', headerKey: 'setorResponsavel' },
        { label: 'Situação', headerKey: 'sitNfe' },
    ]);

    const ButtonTHead = (<StyledIconButtonTHead onClick={() => navigate('/agendamento')}>
        <Typography fontWeight={600} fontSize={14} variant="h6"><LibraryAddIcon fontSize="large" /></Typography >
    </StyledIconButtonTHead>)

    return (
        <StyledTableItems>
            <StyledDivHeader>
            <StyledTitleCharcoal
              variant="h4"
              noWrap
              component="div"
            >Horários agendados
            </StyledTitleCharcoal>
                <StyledDivHeader>
                    <TextField
                        id="ticket-search"
                        label="Pesquisa pelo ticket"
                        variant="filled"
                        style={{ border: "none", margin: "0 -1px 0 0" }}
                        size="small"
                        onKeyDown={(event: React.KeyboardEvent<any>) => {
                            if (event?.key == 'Enter') {
                                setSearchTicket(event?.currentTarget?.value)
                                callbackList(searchTicket);
                            }
                        }}
                        onChange={(event) => setSearchTicket(event?.target?.value)}
                        value={searchTicket}
                    />
                    <StyledButtonBlue size='small' onClick={async () => await callbackList(searchTicket)}>
                        <SearchIcon style={{ fontSize: "2.0rem", marginLeft: "-2px" }} />
                    </StyledButtonBlue>
                </StyledDivHeader>
            </StyledDivHeader>
            <Suspense fallback={<CircularProgress />}>
                <TabelaDeAgendamentos
                    listOfLines={getAtomScheduleList}
                    headerList={headerLine}
                    iconButtonTHead={ButtonTHead}
                    maxItemsPerPage={18}
                    onSelectObjectForPrint={async (object) => printPdf(object)}
                    onDeleteCallback={async (id: string) => {
                        if (id) {
                            await deleteSchedule(id);
                            await callbackList("0");
                        }
                    }}
                />
            </Suspense>
        </StyledTableItems>
    )
}

export default ScheduleTable;