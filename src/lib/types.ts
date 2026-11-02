export type Attachment={id:string;name:string;type:string;data:string};
export type Maintenance={id:string;date:string;description:string;cost:number;attachments:Attachment[]};
export type Product={id:string;name:string;brand:string;model:string;serial:string;category:string;price:number;purchase:string;months:number;manual:string;store:string;image:string;attachments:Attachment[];maintenance:Maintenance[];updatedAt:string;demo?:boolean};
export type Settings={theme:'light'|'dark'|'system';reminders:boolean;lead:number};
