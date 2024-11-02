import cron from 'node-cron';
import { downloadAttachment } from './helpers/email.js';
import { extractPdfData } from './helpers/pdf.js';
import { sendDataToAPI } from './helpers/api.js';

// Run the cron job every day at 3 AM (server time)
// try {
//     const attachmentPath = await downloadAttachment();
//     if (attachmentPath) {
//       const extractedData = await extractPdfData(attachmentPath);
      
//       const formattedData = {
//         // Assuming extractedData is already structured, otherwise parse it here
//         key1: 'value_from_extracted_data',
//         key2: extractedData // or however you want to process the data
//       };

//       await sendDataToAPI(formattedData);
//     } else {
//       console.log('No new attachment found.');
//     }
//   } catch (error) {
//     console.error('Error running job:', error.message);
//   }

try {
    const attachmentPath = await downloadAttachment();
    if (attachmentPath) {
        console.log('Attachment found:', attachmentPath);
    //   const extractedData = await extractPdfData(attachmentPath);
      
    //   const formattedData = {
    //     // Assuming extractedData is already structured, otherwise parse it here
    //     key1: 'value_from_extracted_data',
    //     key2: extractedData // or however you want to process the data
    //   };

    //   await sendDataToAPI(formattedData);
    } else {
      console.log('No new attachment found.');
    }
  } catch (error) {
    console.error('Error running job:', error.message);
  }