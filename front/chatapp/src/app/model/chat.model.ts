export class Chat {
    constructor(public iniciales: string,
                public nombreContacto: string,
                public estadoContacto: string,
                public text: string,
                public date: Date,
                public my: boolean) { }
} 