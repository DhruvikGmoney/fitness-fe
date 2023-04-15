// const getBase64FromUrl = async (url) => {
//     console.log(url)
//     const data = await fetch(url);
//     const blob = await data.blob();
//     console.log(blob)
//     return new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(blob);
//         reader.onloadend = () => {
//             const base64data = reader.result;
//             resolve(base64data);
//         }
//     });
// }
// export {
//     getBase64FromUrl
// }