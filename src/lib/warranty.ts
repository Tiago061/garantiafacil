export function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
export function expiry(purchase:string,months:number,manual?:string){if(manual)return manual;const [y,m,d]=purchase.split('-').map(Number);const last=new Date(y,m-1+months+1,0).getDate();const result=new Date(y,m-1+months,Math.min(d,last));return `${result.getFullYear()}-${String(result.getMonth()+1).padStart(2,'0')}-${String(result.getDate()).padStart(2,'0')}`}
export function daysLeft(end:string,now=today()){const ordinal=(s:string)=>{const [y,m,d]=s.split('-').map(Number);return Date.UTC(y,m-1,d)/86400000};return ordinal(end)-ordinal(now)}
export function status(end:string){const n=daysLeft(end);return n<0?'expired':n<=30?'soon':'active'}
export const labels={active:'Garantia ativa',soon:'Vence em breve',expired:'Garantia expirada'};
export const dateBR=(d:string)=>new Date(d+'T12:00:00').toLocaleDateString('pt-BR');
export const money=(n:number)=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
