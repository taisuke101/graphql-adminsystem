import { UserProps } from './User';

export interface SectionProps {
    uuid: string;
    user: UserProps[];
    sectionCode: string;
    sectionName?: string;
    createDatetime: string;
    updateDatetime: string;
}