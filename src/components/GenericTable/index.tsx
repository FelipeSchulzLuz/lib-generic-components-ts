import { Divider, Skeleton } from '@mui/material';
import { forwardRef, Fragment, SetStateAction, useContext, useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { convertDateToLocal, validateIfIsDate } from '../../utils/utils';
import { ModalDeletar } from '../ModalDeletar';
import { StyledControlTh, StyledDivPagination, StyledGenericTable, StyledPaginationItem, StyledPrintIcon, StyledTableWrapper, StyledTh, StyledTheadNoElement, StyledTrashDeleteButton } from './styles';
import { GenericLineType, TableHeaderObject } from './types';

interface TableProps {
  headerList: TableHeaderObject[];
  listOfLines: any[];
  iconButtonTHead?: JSX.Element;
  maxItemsPerPage: number;
  onDeleteCallback?: (chaveXml: string) => Promise<void>;
  onSelectObjectForPrint?: (object: any) => void;
}

function GenericTable({ headerList, listOfLines, iconButtonTHead, maxItemsPerPage, onDeleteCallback, onSelectObjectForPrint }: TableProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [listLinesPaged, setListLinesPaged] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [chaveSelecionada, setChaveSelecionada] = useState<GenericLineType>();
  const [listOfAllObjects, setListOfAllObjects] = useState<any>([]);
  const totalPaginas = Math.ceil(listOfLines?.length / maxItemsPerPage);
  const [objetoSelecionado, setObjetoSelecionado] = useState({});

  useEffect(() => {
    if (listOfLines?.length) setListOfAllObjects(listOfLines);
  }, [listOfLines]);

  useEffect(() => {
    setListLinesPaged(linesWithPagination(listOfAllObjects));
  }, [listOfAllObjects]);

  useEffect(() => {
    if (currentPage >= 0) setListLinesPaged(linesWithPagination(listOfAllObjects));
  }, [currentPage]);

  useEffect(() => {
    if (typeof onSelectObjectForPrint === 'function') onSelectObjectForPrint(objetoSelecionado);
  }, [objetoSelecionado]);


  const renderRow = (element: (Element | undefined)[] | (JSX.Element | undefined)[], lineKey: string) => {
    if (!element || typeof element === "string") return;
    return <tr id={lineKey} key={lineKey}>{element}</tr>;
  }

  const renderControllerButtons = (
    key: string,
    elements: JSX.Element[]
  ) => {
    return (
      <StyledControlTh key={key}>
        {elements?.map((element, index) => <Fragment key={index}>{element}</Fragment>)}
      </StyledControlTh>
    )
  }

  const renderTableData = (
    objectValues: Object,
    setModalOpen: (value: boolean) => void,
    setChangeState: (value: SetStateAction<string | undefined>) => void,
  ) => {
    const objectAtributesList = Object.create(objectValues);

    return headerList?.map((header, index) => {
      if (index === 0) {
        return (
          <>
            {renderControllerButtons(`key-label${index}`, [
              <StyledTrashDeleteButton onClick={() => {
                setChangeState(Object.create(objectValues));
                setModalOpen(true)
              }} />,
              <Divider orientation="vertical" />,
              <StyledPrintIcon onClick={() => {
                setObjetoSelecionado(objectValues);
              }} />
              // <StyledEditButton onClick={() => navigate(`/agendamento/${identificationKey}`)} />
            ])}
            {index === 0 && <td>{objectAtributesList[header?.headerKey]}</td>}
          </>
        )
      } else if (objectAtributesList[header?.headerKey]?.length === 10 && validateIfIsDate(objectAtributesList[header?.headerKey]?.toString())) {
        const dataValidaToLocaleString = convertDateToLocal(objectAtributesList[header?.headerKey])
        return <td>{dataValidaToLocaleString}</td>
      } else {
        return <td>{objectAtributesList[header?.headerKey]?.toString()}</td>
      }
    });
  }

  const ModalDelete = forwardRef((props, ref) => (
    <ModalDeletar
      ref={ref}
      open={open}
      setOpen={setOpen}
      handleFunction={() => {
        onDeleteCallback && onDeleteCallback(chaveSelecionada?.chaveAcesso);
        setChaveSelecionada({} as GenericLineType);
        setOpen(false);
      }}
    />
  ));

  const linesWithPagination = (list: any[]) => {
    const start = currentPage * maxItemsPerPage;
    const end = start + maxItemsPerPage;
    return list.slice(start, end);
  }

  const renderPageNumbers = () => {
    const paginas = [];
    for (let index = 0; index <= totalPaginas - 1; index++) {
      paginas.push(
        <StyledPaginationItem
          key={index}
          active={index === currentPage}
          onClick={() => changePageValue(index)}
          id={`page-${index + 1}`}
        >{index + 1}
        </StyledPaginationItem>
      );
    }
    if (currentPage > 2) {
      paginas.splice(0, currentPage - 2);
    }
    if (paginas.length > 5) {
      paginas.splice(5, paginas.length - 5);
    }
    if (currentPage < totalPaginas - 2) {
      paginas.splice(5, paginas.length - 5);
    }
    return paginas;
  };

  const changePageValue = (numeroDaPagina: number) => {
    if (numeroDaPagina === currentPage) return;
    setListLinesPaged([]);
    setCurrentPage(numeroDaPagina)
  }

  const renderHeader = () => {
    return headerList?.map((header, index) => <StyledTh id={`header-td-${index}`} onClick={header?.onClick} key={`header-td-${index}`} >{header?.label}</StyledTh>)
  }

  return (
    <StyledTableWrapper>
      {!listLinesPaged?.length
        ? <Skeleton style={{
          width: '100%',
          height: '1500px',
          margin: '-330px 0',
        }} animation="wave" ></Skeleton>
        :
        <StyledGenericTable striped bordered hover responsive>
          <thead>
            <tr>
              {iconButtonTHead ? iconButtonTHead : <StyledTheadNoElement key="icon-thead" />}
              {renderHeader()}
            </tr>
          </thead>
          <tbody>
            {listLinesPaged?.map((line: GenericLineType, index: number) => {
              const data = { ...line }
              return renderRow(
                renderTableData(
                  line,
                  () => setOpen(true),
                  () => setChaveSelecionada(data),
                ), (`line-${index}`)
              );
            })}
          </tbody>
        </StyledGenericTable>}
      {listLinesPaged?.length > 0 ? (
        <StyledDivPagination>
          <Pagination>
            <Pagination.First
              disabled={currentPage === 0}
              onClick={() => changePageValue(0)}
              id="first"
            />
            <Pagination.Prev
              onClick={() => changePageValue(currentPage - 1)}
              disabled={currentPage === 0}
              id="prev"
            />
            {renderPageNumbers()}
            <Pagination.Next
              disabled={currentPage === totalPaginas - 1}
              onClick={() => changePageValue(currentPage + 1)}
              id="next"
            />
            <Pagination.Last
              disabled={currentPage > totalPaginas - 6}
              onClick={() => changePageValue(totalPaginas - 1)}
              id="last"
            />
          </Pagination>
        </StyledDivPagination>) : null}
      <ModalDelete />
    </StyledTableWrapper>
  )
}

export default GenericTable;