export interface Source {
  title: string;
  link: string;
  score?: number;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  sources?: Source[];
  timestamp: number;
}

export interface DocumentFile {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'pptx';
  size: string;
  status: 'uploading' | 'processing' | 'ready';
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  documents: DocumentFile[];
}