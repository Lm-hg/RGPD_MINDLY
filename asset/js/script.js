pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.13.216/pdf.worker.min.js';
const url = "../asset/rgpd/rgpd.pdf"; 
const pdfContainer = document.getElementById("pdf-container");
const paymentBanner = document.getElementById("payment-banner");
const linkSuite = document.getElementById("link-suite");



pdfjsLib.getDocument(url).promise.then(pdf => {
    const totalPages = pdf.numPages;
    const maxFreePages = 14;

    for (let i = 1; i <= totalPages; i++) {
        if (i > maxFreePages) {
            paymentBanner.style.display = "block"; 
            break;
        }

        pdf.getPage(i).then(page => {
            const viewport = page.getViewport({ scale: 1 });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            pdfContainer.appendChild(canvas);

            page.render({
                canvasContext: context,
                viewport: viewport
            });
        });
    }
});

