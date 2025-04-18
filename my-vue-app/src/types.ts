export interface IssueType {
    id: string;
    name: string;
    description: string;
}

export interface ObjType {
    title: string;
    issues: IssueType[];
}
