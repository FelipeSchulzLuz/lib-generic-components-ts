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
                { value: "1", label: "BANNER_FIXO" },
                { value: "2", label: "ITEMS_MARCA" },
                { value: "3", label: "BANNER_DISPLAY" },
                { value: "4", label: "BANNER_CAROUSEL" },
            ])
        }, 1000)
    })
}
