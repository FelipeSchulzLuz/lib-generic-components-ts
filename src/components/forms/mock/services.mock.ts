export const fakeLoadPrivacyBannerOptions = () => {
    return new Promise((resolve) => {
        console.log("LoadPrivacyBannerOptions");
        setTimeout(() => {
            resolve([
                { value: true, label: "Ativo" },
                { value: "0", label: "Inativo" },
            ])
        }, 1000)
    })
}

export const fakeLoadStatusOptions = () => {
    return new Promise((resolve) => {
        console.log("LoadStatusOptions");
        setTimeout(() => {
            resolve([
                { value: "PUBLIC", label: "Deslogado" },
                { value: "PRIVATE", label: "Logado" },
            ])
        }, 1000)
    })
}

export const fakeLoadCategoryOptions = () => {
    return new Promise((resolve) => {
        console.log("fakeLoadOptions");
        setTimeout(() => {
            resolve([
                { label: 'Fixo', key: "1", value: "BANNER_FIXO" },
                { label: 'Items da Marca', key: "2", value: "ITEMS_MARCA" },
                { label: 'Carousel Card', key: "3", value: "BANNER_CAROUSEL_CARD" },
                { label: 'Carousel Tela Inteira', key: "4", value: "BANNER_CAROUSEL_FULL_WIDTH" },
            ])
        }, 1000)
    })
}
