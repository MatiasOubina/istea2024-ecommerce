export async function getProductos() {
    try {
        const rtaApi = await fetch("https://fakestoreapi.com/products");
        const data = await rtaApi.json();
        return data;
    } catch (error) {
        console.error(`$Falló la conexión con API: ${error}`);
    }
}

export async function getCategories() {
    try {
        const rtaApi = await fetch("https://fakestoreapi.com/products/categories");
        const data = await rtaApi.json();
        return data;
    } catch (error) {
        console.error(`$Falló la conexión con API: ${error}`);
    }
}