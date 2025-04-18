import {ObjType} from "./types";

export const dataMock: ObjType[] = [
    {
        title: 'backlog',
        issues: [
            {
                id: '12345',
                name: 'Sprint bugfix',
                description: 'Fix all the bugs',
            },
        ],
    },
    {
        title: 'ready',
        issues: [],
    },
    {
        title: 'in progress',
        issues: [],
    },
    {
        title: 'finished',
        issues: [],
    },
];
