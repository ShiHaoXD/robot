export interface StudentInfo {
    [name: string]: {
        info: {
            xh: string;
            name: string;
            xy: string;
            openid: string;
            address: string;
            gender: string;
        };
        owner_id: number;
        switch_key: boolean;
    };
}
