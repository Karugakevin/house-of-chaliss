import {
    PDFDocument,
    StandardFonts,
    rgb,
} from "pdf-lib";

interface InvoiceData {
    invoiceId: string;
    customerName: string;
    customerEmail: string;
    bookTitle: string;
    amount: number;
    currency: string;
    transactionId: string;
    paymentStatus: string;
    purchaseDate: string;
}

export async function generateInvoice(
    invoice: InvoiceData
) {
    const pdf = await PDFDocument.create();

    const page = pdf.addPage([595, 842]);

    const width = page.getWidth();
    const height = page.getHeight();

    const font = await pdf.embedFont(
        StandardFonts.Helvetica
    );

    const bold = await pdf.embedFont(
        StandardFonts.HelveticaBold
    );

    let y = height - 60;

    function text(
        value: string,
        size = 12,
        boldText = false
    ) {
        page.drawText(value, {
            x: 50,
            y,
            size,
            font: boldText ? bold : font,
            color: rgb(0, 0, 0),
        });

        y -= size + 12;
    }

    text("HOUSE OF CHALISS", 22, true);

    text("Invoice", 18, true);

    y -= 10;

    text(`Invoice Number: ${invoice.invoiceId}`);

    text(`Purchase Date: ${invoice.purchaseDate}`);

    y -= 10;

    text("Customer", 16, true);

    text(invoice.customerName);

    text(invoice.customerEmail);

    y -= 10;

    text("Book", 16, true);

    text(invoice.bookTitle);

    y -= 10;

    text("Amount", 16, true);

    text(
        `${invoice.currency} ${invoice.amount.toLocaleString()}`
    );

    y -= 10;

    text("Payment Status", 16, true);

    text(invoice.paymentStatus);

    y -= 10;

    text("Transaction ID", 16, true);

    text(invoice.transactionId);

    y -= 30;

    page.drawLine({
        start: {
            x: 50,
            y,
        },
        end: {
            x: width - 50,
            y,
        },
        thickness: 1,
    });

    y -= 40;

    page.drawText("Thank you for your purchase.", {
        x: 50,
        y,
        size: 12,
        font,
    });

    return await pdf.save();
}