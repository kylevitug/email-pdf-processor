import imaps from 'imap-simple';
import { simpleParser } from 'mailparser';
import fs from 'fs';
import path from 'path';
import config from '../config.js';

const downloadAttachment = async () => {
  const connection = await imaps.connect({ imap: config.email });
  await connection.openBox('INBOX');
  
  // Calculate the date 90 days ago
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  const formattedDate = ninetyDaysAgo.toISOString().split('T')[0]; // Format as YYYY-MM-DD

  // Search for both seen and unseen messages from the specific sender within the last 90 days
  const searchCriteria = [
    'ALL',
    ['FROM', 'advising.service@advising.hsbc.com'],
    ['SINCE', formattedDate]
  ];
  const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: true };

  const messages = await connection.search(searchCriteria, fetchOptions);
  console.log(`Found ${messages.length} messages from the last 90 days.`);
  for (let item of messages) {
    const parts = imaps.getParts(item.attributes.struct);
    for (let part of parts) {
        console.log(part);
      if (part.disposition && part.disposition.type === 'attachment') {
        const { params } = part;
        const attachmentPath = path.join(process.cwd(), 'attachments', params.name);
        const partData = await connection.getPartData(item, part);
        
        fs.writeFileSync(attachmentPath, partData);
        console.log(`Attachment ${params.name} saved successfully.`);
        connection.end();
        return attachmentPath; // Return the attachment path for further processing
      }
    }
  }

  connection.end();
  return null; // If no attachment found
};

export { downloadAttachment };
