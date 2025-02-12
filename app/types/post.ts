export interface Post { // for request
  id: number;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;  
  updatedAt: string;   
}

export interface Posts{ // for response
  id: number;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;  
  updatedAt: string;   
}