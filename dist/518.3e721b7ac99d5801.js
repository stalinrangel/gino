"use strict";(self.webpackChunkfree_version=self.webpackChunkfree_version||[]).push([[518],{9518:(f,p,i)=>{i.r(p),i.d(p,{OrdenesComponent:()=>m});var r=i(95),a=i(627),_=i(8645),e=i(9468),g=i(1492),u=i(870),c=i(2098);let m=(()=>{class s{constructor(n,t,o){this.notify=n,this.api=t,this.router=o,this.dtOptions={},this.dtTrigger=new _.x,this.pedido={id:0,info:"",company_id:"",company_name:"",user_id:"",user_name:""},this.message="",this.data=[],this.data1=[]}someClickHandler(n){this.message=n.id+" - "+n.name,this.pedido=n}ngAfterViewInit(){this.dtTrigger.next(this.dtOptions)}ngOnDestroy(){this.dtTrigger.unsubscribe()}rerender(){let n=this;this.dtElement.dtInstance.then(t=>{t.destroy(),n.dtOptions.data=this.data,this.dtTrigger.next(n.dtOptions),console.log(n.dtOptions)}),console.log(this.data)}ngOnInit(){this.dtOptions={data:this.data,columns:[{title:"ID",data:"id"},{title:"Informaci\xf3n",data:"info"},{title:"Empresa",data:"company_name"},{title:"Usuario",data:"user_name"}],rowCallback:(t,o,d)=>{const h=this;return $("td",t).off("click"),$("td",t).on("click",()=>{h.someClickHandler(o)}),t}};let n=this;this.api.getorders().subscribe({next(t){t.reverse(),console.log(t),n.data=t,n.rerender()},error(t){console.log(t),n.notify.notifyError(t.error)}})}crear(){let n=this;""==this.pedido.info?this.notify.notifyError("Complete los datos"):(console.log(this.pedido),this.api.createpedidos(this.pedido).subscribe({next(t){console.log(t),n.notify.notifySuccess("Pedido creado con \xe9xito!"),n.reset()},error(t){console.log(t),n.notify.notifyError(t.error)}}))}reset(){this.pedido.id=0,this.pedido.info="",this.pedido.company_id="",this.pedido.user_id="",this.add()}add(){this.data=[]}ver(){this.router.navigate(["/orden/"+this.pedido.id])}}return s.\u0275fac=function(n){return new(n||s)(e.Y36(g.s),e.Y36(u.s),e.Y36(c.F0))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-ordenes"]],viewQuery:function(n,t){if(1&n&&e.Gf(a.G,5),2&n){let o;e.iGM(o=e.CRH())&&(t.dtElement=o.first)}},standalone:!0,features:[e.jDz],decls:36,vars:6,consts:[[1,"row"],[1,"row","justify-content-center"],[1,"col-xl-6","col-md-6"],[1,"card"],[1,"card-body"],[1,"text-danger"],["datatable","",1,"row-border","hover",3,"dtOptions","dtTrigger"],[1,"auth-header"],[1,"text-secondary","mt-5"],[1,"fs-4","mt-2"],[1,"form-floating","mb-3"],["type","text","id","Empresa","value","Empresa ...",1,"form-control",3,"ngModel","ngModelChange"],["for","Empresa"],["type","text","id","info","value","Info ...",1,"form-control",3,"ngModel","ngModelChange"],["for","info"],[1,"d-grid","mt-4"],["type","button",1,"btn","btn-secondary",3,"click"]],template:function(n,t){1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",0)(6,"p",5),e._uU(7,"Has seleccionado: "),e.TgZ(8,"strong"),e._uU(9),e.qZA()(),e._UZ(10,"table",6),e.qZA()()()(),e.TgZ(11,"div",2)(12,"div",3)(13,"div",4)(14,"div",0)(15,"div",7)(16,"h2",8)(17,"b"),e._uU(18,"Informacion de las ordenes"),e.qZA()(),e.TgZ(19,"p",9),e._uU(20,"Resumen del pedido"),e.qZA()(),e.TgZ(21,"div",10)(22,"input",11),e.NdJ("ngModelChange",function(d){return t.pedido.info=d}),e.qZA(),e.TgZ(23,"label",12),e._uU(24,"Nombre"),e.qZA()(),e.TgZ(25,"div",10)(26,"input",13),e.NdJ("ngModelChange",function(d){return t.pedido.company_name=d}),e.qZA(),e.TgZ(27,"label",14),e._uU(28,"Empresa"),e.qZA()(),e.TgZ(29,"div",10)(30,"input",13),e.NdJ("ngModelChange",function(d){return t.pedido.user_name=d}),e.qZA(),e.TgZ(31,"label",14),e._uU(32,"Usuario"),e.qZA()(),e.TgZ(33,"div",15)(34,"button",16),e.NdJ("click",function(){return t.ver()}),e._uU(35,"Ver"),e.qZA()()()()()()()()),2&n&&(e.xp6(9),e.Oqu(t.message),e.xp6(1),e.Q6J("dtOptions",t.dtOptions)("dtTrigger",t.dtTrigger),e.xp6(12),e.Q6J("ngModel",t.pedido.info),e.xp6(4),e.Q6J("ngModel",t.pedido.company_name),e.xp6(4),e.Q6J("ngModel",t.pedido.user_name))},dependencies:[a.T,a.G,r.u5,r.Fj,r.JJ,r.On]}),s})()}}]);