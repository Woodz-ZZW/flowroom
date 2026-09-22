import { z } from 'zod';
export const screenSchema = z.object({id:z.string().max(80),type:z.enum(['welcome','profile','preferences']),name:z.string().min(1).max(60),title:z.string().min(1).max(100),description:z.string().max(250),button:z.string().min(1).max(40),color:z.string().regex(/^#[0-9a-fA-F]{6}$/),background:z.string().regex(/^#[0-9a-fA-F]{6}$/),radius:z.number().min(0).max(32),spacing:z.number().min(12).max(40),progress:z.boolean()});
export type Screen = z.infer<typeof screenSchema>;
export type Comment = {id:string;screenId:string;author:string;text:string;resolved:boolean;createdAt:number};
export const initialScreens:Screen[] = [
{id:'welcome',type:'welcome',name:'Welcome',title:'A little clarity.\nA lot more possibility.',description:'Meet your money, minus the stress.\nBuild better habits with Bloom.',button:'Let’s get started',color:'#DA7454',background:'#FFFFFF',radius:12,spacing:24,progress:true},
{id:'profile',type:'profile',name:'Profile setup',title:'Let’s make it\npersonal.',description:'A few details to make Bloom\nfeel a little more like you.',button:'Continue',color:'#DA7454',background:'#FFFFFF',radius:12,spacing:24,progress:true},
{id:'preferences',type:'preferences',name:'Preferences',title:'Your money.\nYour priorities.',description:'What would you like to focus on?\nPick what matters to you.',button:'Make it happen',color:'#DA7454',background:'#FFFFFF',radius:12,spacing:24,progress:true}
];
export const initialComments:Comment[] = [{id:'sample-note',screenId:'profile',author:'Alex · sample feedback',text:'Could we explain why we need their email? A little reassurance here would help.',resolved:false,createdAt:0}];
export function generateTemplate(brief:string):Screen[]{
 const fitness=/fitness|workout|health|exercise/i.test(brief), travel=/travel|trip|journey/i.test(brief), learning=/learn|education|study/i.test(brief);
 const names=fitness?['A stronger start.\nA healthier you.','Let’s get to\nknow you.','Find your\nnext challenge.']:travel?['Your next chapter\nstarts here.','Make room for\nyour next adventure.','Travel your\nown way.']:learning?['Small steps.\nBig discoveries.','A learning path\nthat’s yours.','Follow your\ncuriosity.']:initialScreens.map(s=>s.title);
 return initialScreens.map((s,i)=>({...s,id:crypto.randomUUID(),title:names[i],description:i===0?(fitness?'Build a routine that fits your life.\nLet’s take the first step.':travel?'Plan less. Discover more.\nYour adventure is waiting.':learning?'Make progress, one day at a time.\nDiscover what you can do.':s.description):s.description}));
}
