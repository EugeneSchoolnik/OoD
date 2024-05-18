import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";

const props = {
  outputType: OutputType.Save,
  // onJsPDFDocCreation?: (jsPDFDoc: jsPDF) => void, //Allows for additional configuration prior to writing among others, adds support for different languages and symbols
  returnJsPDFDocObject: true,
  fileName: "",
  orientationLandscape: false,
  compress: true,
  //   logo: {
  //     src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
  //     type: "PNG", //optional, when src= data:uri (nodejs case)
  //     width: 53.33, //aspect ratio = width/height
  //     height: 26.66,
  //     margin: {
  //       top: 0, //negative or positive num, from the current position
  //       left: 0, //negative or positive num, from the current position
  //     },
  //   },
  //   stamp: {
  //     inAllPages: true, //by default = false, just in the last page
  //     src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
  //     type: "JPG", //optional, when src= data:uri (nodejs case)
  //     width: 20, //aspect ratio = width/height
  //     height: 20,
  //     margin: {
  //       top: 0, //negative or positive num, from the current position
  //       left: 0, //negative or positive num, from the current position
  //     },
  //   },
  //   business: {
  //     name: "Business Name",
  //     address: "Albania, Tirane ish-Dogana, Durres 2001",
  //     phone: "(+355) 069 11 11 111",
  //     email: "email@example.com",
  //     email_1: "info@example.al",
  //     website: "www.example.al",
  //   },
  //   contact: {
  //     label: "Invoice issued for:",
  //     name: "Client Name",
  //     address: "Albania, Tirane, Astir",
  //     phone: "(+355) 069 22 22 222",
  //     email: "client@website.al",
  //     otherInfo: "www.website.al",
  //   },
  invoice: {
    label: "",
    // num: 19,
    invDate: "",
    // invGenDate: "Invoice Date: 02/02/2021 10:17",
    headerBorder: false,
    tableBodyBorder: false,
    header: [
      //   {
      //     title: "#",
      //     style: {
      //       width: 10,
      //     },
      //   },
    ] as any,
    table: [] as any,
    // Array.from(Array(10), (item, index) => [
    //   index + 1,
    //   "There are many variations ",
    //   "Lorem Ipsum is simply dummy text dummy text ",
    //   200.5,
    //   4.5,
    //   "m2",
    //   400.5,
    // ]),
    additionalRows: [
      {
        col1: "Total:",
        col2: "",
        style: {
          fontSize: 14, //optional, default 12
        },
      },
    ],
    // invDescLabel: "Invoice Note",
    // invDesc:
    //   "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
  },
  //   footer: {
  //     text: "",
  //   },
  pageEnable: true,
  pageLabel: "Page ",
};

export const createReport = (name: string, titles: [string, number][], data: Record<string, any>[]) => {
  props.fileName = name;
  props.invoice.label = name;
  props.invoice.invDate = new Date().toISOString().split("T")[0];
  props.invoice.header = titles.map((i) => ({
    title: i[0],
    style: {
      width: i[1],
    },
  }));
  props.invoice.table = data.map((i) => Object.values(i).map((i) => (typeof i == "number" ? i.toFixed(2) : i)));
  props.invoice.additionalRows[0].col2 = data.length.toString();

  jsPDFInvoiceTemplate(props);
};

//or in browser
// var pdfObject = jsPDFInvoiceTemplate.default(props); //returns number of pages created
