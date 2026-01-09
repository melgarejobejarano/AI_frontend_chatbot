export const APP_CONFIG = {
  title: "Chatbot Assistant",
  purpose: "PURPOSE: This ChatBot was developed to support teams in easily accessing key information from their knowledge base documents.",
  acknowledgment: "ACKNOWLEDGMENT: This ChatBot uses Artificial Intelligence (AI) to understand questions and provide automated responses based on your uploaded documents. Always verify with the original sources.",
  footerEmail: "support@chatbot-assistant.com"
};

export const MOCK_DOCS = [
  { id: '1', name: 'Technical_Guidelines_2024.pdf', type: 'pdf', size: '2.4 MB', status: 'ready' },
  { id: '2', name: 'Annual_Plan_Overview.docx', type: 'docx', size: '1.1 MB', status: 'ready' },
  { id: '3', name: 'Project_Metrics_v2.pptx', type: 'pptx', size: '5.6 MB', status: 'ready' },
] as const;