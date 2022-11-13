
const inputs: InputType[] = [
    {
        key: "form-banners-order",
        label: "Ordenação",
        value: order,
        type: "number",
        size: "medium",
        name: "order",
        required: true,
        useSetState: setOrdenacao,
        placeholder: "Digite um valor numerico",
        errors: errorMessages || [],
    },
]

const selects: SelectType[] = [
    {
        key: "form-banners-visualizacao",
        label: "Visualização",
        type: "select",
        size: "normal",
        name: "accessType",
        required: true,
        useSetState: setAccessType,
        options: [
            { key: "PUBLICO", value: "PUBLIC", label: "Público" },
            { key: "LOGADO", value: "PRIVATE", label: "Logado" },
        ],
        value: accessType,
        errors: errorMessages || [],
    },
    {
        key: "form-banners-category",
        label: "Categoria",
        type: "select",
        size: "normal",
        name: "category",
        required: true,
        useSetState: setCategoria,
        options: [
            { key: "VITRINE_ITENS_DA_MARCA", value: "VITRINE_ITENS_DA_MARCA", label: "Vitrine de itens da marca" },
            { key: "VITRINE_PROMOCAO", value: "VITRINE_PROMOCAO", label: "Vitrine de promoção" },
            { key: "VITRINE_BANNER", value: "VITRINE_BANNER", label: "Vitrine de banner" },
            { key: "BANNER_FIXO", value: "BANNER_FIXO", label: "Banner fixo" },
            { key: "VITRINE_MARCA", value: "VITRINE_MARCA", label: "Vitrine de marca" },
            { key: "BANNER_CARROSSEL", value: "BANNER_CARROSSEL", label: "Banner carrossel" },
        ],
        value: category,
        errors: errorMessages || [],
    },
    {
        key: "form-banners-status",
        label: "Status",
        type: "select",
        size: "normal",
        name: "status",
        required: true,
        value: status,
        useSetState: setStatus,
        options: [
            { key: "ATIVO", value: "true", label: "Ativo" },
            { key: "INATIVO", value: "false", label: "Inativo" },
        ],
        errors: errorMessages || [],
    },
]

const dates: DateType[] = [
    {
        key: "form-banners-data-inicio",
        type: "date",
        label: "Data de Início",
        value: startDate,
        name: "startDate",
        useSetState: setInitialDate,
        errors: errorMessages || [],
    },
    {
        key: "form-banners-data-final",
        type: "date",
        label: "Data Final",
        value: endDate,
        name: "endDate",
        useSetState: dateEndFormat,
        errors: errorMessages || [],
    },
]
