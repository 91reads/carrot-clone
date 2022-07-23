import { UserStructure } from "./profile_type";

export interface CommunityCardProps {
  question: string;
  user: UserStructure;
  updatedAt: Date;
  onClick?: () => void;
  _count: {
    wondering: number;
    answers: number;
  }
}

export interface PostStructureType {
  createdAt: string;
  id: number;
  latitude?: number;
  longitude?: number;
  question: string;
  updatedAt: Date;
  user: {
    id: number;
    name: string;
    avatar?: string;
    userId: number;
  }
  _count: {
    wondering: number;
    answers: number;
  }
}

export interface AnswerStructureType {
  answer: string;
  id: number;
  user: {
    id: number;
    name: string;
    avatar?: string;
  }
}

export interface PostRegisterType {
  question: string;
  latitude?: number;
  longitude?: number;
}
