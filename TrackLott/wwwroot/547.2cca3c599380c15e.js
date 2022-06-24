"use strict";(self.webpackChunkTrackLott=self.webpackChunkTrackLott||[]).push([[547],{5547:(H,h,t)=>{t.r(h),t.d(h,{AccountModule:()=>J});var c=t(1083),n=t(3075),i=t(7727),a=t(5e3),A=t(1297),d=t(9876),S=t(8161),b=t(9224),Z=t(4834),s=t(7322),T=t(7531),p=t(7446),M=t(7423),m=t(9808),C=t(773);function y(e,o){1&e&&(a.TgZ(0,"div",9),a._UZ(1,"mat-spinner",10),a.qZA())}let I=(()=>{class e{constructor(l,u,r,v){this.loadingService=l,this.accountService=u,this.router=r,this.snackBarService=v,this.isLoading$=this.loadingService.isLoading$}ngOnInit(){this.loginForm=new n.cw({email:new n.NI(null,n.kI.required),password:new n.NI(null,n.kI.required),rememberMe:new n.NI(!1,n.kI.pattern("true|false"))})}onLoginSubmit(){if(console.log(this.loginForm),this.loginForm.valid){let l=Object.assign({},this.loginForm.value);this.accountService.onLogin(l).subscribe({next:()=>{this.router.navigate([i.H.homeAbs])},error:u=>this.snackBarService.showSnackBar(u.error)})}}}return e.\u0275fac=function(l){return new(l||e)(a.Y36(A.u),a.Y36(d.B),a.Y36(c.F0),a.Y36(S.c))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-login"]],decls:24,vars:4,consts:[[1,"row","col-md-6","mx-auto","mat-elevation-z6"],["inset","",1,"my-3"],[1,"row",3,"formGroup","ngSubmit"],["appearance","outline"],["email","","formControlName","email","matInput","","pattern","(?:^|\\s)[\\w!#$%&'*+/=?^`{|}~-](\\.?[\\w!#$%&'*+/=?^`{|}~-]+)*@\\w+[.-]?\\w*\\.[a-zA-Z]{2,3}\\b","required","","type","email",1,"mat-typography"],["formControlName","password","matInput","","placeholder","Enter your password","required","","type","password"],["name","rememberMe"],["color","primary","mat-flat-button","","type","submit",1,"w-50","mb-3","mx-auto","text-uppercase"],["class","spinnerOverlay",4,"ngIf"],[1,"spinnerOverlay"],["color","accent","diameter","50"]],template:function(l,u){1&l&&(a.TgZ(0,"mat-card",0)(1,"mat-card-title"),a._uU(2,"Login"),a.qZA(),a._UZ(3,"mat-divider",1),a.TgZ(4,"mat-card-content")(5,"form",2),a.NdJ("ngSubmit",function(){return u.onLoginSubmit()}),a.TgZ(6,"mat-form-field",3)(7,"mat-label"),a._uU(8,"Email Address"),a.qZA(),a._UZ(9,"input",4),a.TgZ(10,"mat-error"),a._uU(11,"Invalid email address"),a.qZA()(),a.TgZ(12,"mat-form-field",3)(13,"mat-label"),a._uU(14,"Password"),a.qZA(),a._UZ(15,"input",5),a.TgZ(16,"mat-error"),a._uU(17,"Invalid password"),a.qZA()(),a.TgZ(18,"mat-checkbox",6),a._uU(19,"Remember Me"),a.qZA(),a.TgZ(20,"button",7),a._uU(21,"Login"),a.qZA()()()(),a.YNc(22,y,2,0,"div",8),a.ALo(23,"async")),2&l&&(a.xp6(5),a.Q6J("formGroup",u.loginForm),a.xp6(17),a.Q6J("ngIf",a.lcZ(23,2,u.isLoading$)))},directives:[b.a8,b.n5,Z.d,b.dn,n._Y,n.JL,n.sg,s.KE,s.hX,n.Fj,T.Nt,n.on,n.JJ,n.u,n.c5,n.Q7,s.TO,p.oG,M.lW,m.O5,C.Ou],pipes:[m.Ov],styles:[""]}),e})();const U=[{label:"Afghanistan",value:"AF"},{label:"\xc5land Islands",value:"AX"},{label:"Albania",value:"AL"},{label:"Algeria",value:"DZ"},{label:"American Samoa",value:"AS"},{label:"Andorra",value:"AD"},{label:"Angola",value:"AO"},{label:"Anguilla",value:"AI"},{label:"Antarctica",value:"AQ"},{label:"Antigua and Barbuda",value:"AG"},{label:"Argentina",value:"AR"},{label:"Armenia",value:"AM"},{label:"Aruba",value:"AW"},{label:"Australia",value:"AU"},{label:"Austria",value:"AT"},{label:"Azerbaijan",value:"AZ"},{label:"Bahamas",value:"BS"},{label:"Bahrain",value:"BH"},{label:"Bangladesh",value:"BD"},{label:"Barbados",value:"BB"},{label:"Belarus",value:"BY"},{label:"Belgium",value:"BE"},{label:"Belize",value:"BZ"},{label:"Benin",value:"BJ"},{label:"Bermuda",value:"BM"},{label:"Bhutan",value:"BT"},{label:"Bolivia",value:"BO"},{label:"Bosnia and Herzegovina",value:"BA"},{label:"Botswana",value:"BW"},{label:"Bouvet Island",value:"BV"},{label:"Brazil",value:"BR"},{label:"British Indian Ocean Territory",value:"IO"},{label:"Brunei Darussalam",value:"BN"},{label:"Bulgaria",value:"BG"},{label:"Burkina Faso",value:"BF"},{label:"Burundi",value:"BI"},{label:"Cambodia",value:"KH"},{label:"Cameroon",value:"CM"},{label:"Canada",value:"CA"},{label:"Cape Verde",value:"CV"},{label:"Cayman Islands",value:"KY"},{label:"Central African Republic",value:"CF"},{label:"Chad",value:"TD"},{label:"Chile",value:"CL"},{label:"China",value:"CN"},{label:"Christmas Island",value:"CX"},{label:"Cocos (Keeling) Islands",value:"CC"},{label:"Colombia",value:"CO"},{label:"Comoros",value:"KM"},{label:"Congo",value:"CG"},{label:"Congo, The Democratic Republic of the",value:"CD"},{label:"Cook Islands",value:"CK"},{label:"Costa Rica",value:"CR"},{label:"Cote D'Ivoire",value:"CI"},{label:"Croatia",value:"HR"},{label:"Cuba",value:"CU"},{label:"Cyprus",value:"CY"},{label:"Czech Republic",value:"CZ"},{label:"Denmark",value:"DK"},{label:"Djibouti",value:"DJ"},{label:"Dominica",value:"DM"},{label:"Dominican Republic",value:"DO"},{label:"Ecuador",value:"EC"},{label:"Egypt",value:"EG"},{label:"El Salvador",value:"SV"},{label:"Equatorial Guinea",value:"GQ"},{label:"Eritrea",value:"ER"},{label:"Estonia",value:"EE"},{label:"Ethiopia",value:"ET"},{label:"Falkland Islands (Malvinas)",value:"FK"},{label:"Faroe Islands",value:"FO"},{label:"Fiji",value:"FJ"},{label:"Finland",value:"FI"},{label:"France",value:"FR"},{label:"French Guiana",value:"GF"},{label:"French Polynesia",value:"PF"},{label:"French Southern Territories",value:"TF"},{label:"Gabon",value:"GA"},{label:"Gambia",value:"GM"},{label:"Georgia",value:"GE"},{label:"Germany",value:"DE"},{label:"Ghana",value:"GH"},{label:"Gibraltar",value:"GI"},{label:"Greece",value:"GR"},{label:"Greenland",value:"GL"},{label:"Grenada",value:"GD"},{label:"Guadeloupe",value:"GP"},{label:"Guam",value:"GU"},{label:"Guatemala",value:"GT"},{label:"Guernsey",value:"GG"},{label:"Guinea",value:"GN"},{label:"Guinea-Bissau",value:"GW"},{label:"Guyana",value:"GY"},{label:"Haiti",value:"HT"},{label:"Heard Island and Mcdonald Islands",value:"HM"},{label:"Holy See (Vatican City State)",value:"VA"},{label:"Honduras",value:"HN"},{label:"Hong Kong",value:"HK"},{label:"Hungary",value:"HU"},{label:"Iceland",value:"IS"},{label:"India",value:"IN"},{label:"Indonesia",value:"ID"},{label:"Iran, Islamic Republic Of",value:"IR"},{label:"Iraq",value:"IQ"},{label:"Ireland",value:"IE"},{label:"Isle of Man",value:"IM"},{label:"Israel",value:"IL"},{label:"Italy",value:"IT"},{label:"Jamaica",value:"JM"},{label:"Japan",value:"JP"},{label:"Jersey",value:"JE"},{label:"Jordan",value:"JO"},{label:"Kazakhstan",value:"KZ"},{label:"Kenya",value:"KE"},{label:"Kiribati",value:"KI"},{label:"Democratic People's Republic of Korea",value:"KP"},{label:"Korea, Republic of",value:"KR"},{label:"Kosovo",value:"XK"},{label:"Kuwait",value:"KW"},{label:"Kyrgyzstan",value:"KG"},{label:"Lao People's Democratic Republic",value:"LA"},{label:"Latvia",value:"LV"},{label:"Lebanon",value:"LB"},{label:"Lesotho",value:"LS"},{label:"Liberia",value:"LR"},{label:"Libyan Arab Jamahiriya",value:"LY"},{label:"Liechtenstein",value:"LI"},{label:"Lithuania",value:"LT"},{label:"Luxembourg",value:"LU"},{label:"Macao",value:"MO"},{label:"Macedonia, The Former Yugoslav Republic of",value:"MK"},{label:"Madagascar",value:"MG"},{label:"Malawi",value:"MW"},{label:"Malaysia",value:"MY"},{label:"Maldives",value:"MV"},{label:"Mali",value:"ML"},{label:"Malta",value:"MT"},{label:"Marshall Islands",value:"MH"},{label:"Martinique",value:"MQ"},{label:"Mauritania",value:"MR"},{label:"Mauritius",value:"MU"},{label:"Mayotte",value:"YT"},{label:"Mexico",value:"MX"},{label:"Micronesia, Federated States of",value:"FM"},{label:"Moldova, Republic of",value:"MD"},{label:"Monaco",value:"MC"},{label:"Mongolia",value:"MN"},{label:"Montenegro",value:"ME"},{label:"Montserrat",value:"MS"},{label:"Morocco",value:"MA"},{label:"Mozambique",value:"MZ"},{label:"Myanmar",value:"MM"},{label:"Namibia",value:"NA"},{label:"Nauru",value:"NR"},{label:"Nepal",value:"NP"},{label:"Netherlands",value:"NL"},{label:"Netherlands Antilles",value:"AN"},{label:"New Caledonia",value:"NC"},{label:"New Zealand",value:"NZ"},{label:"Nicaragua",value:"NI"},{label:"Niger",value:"NE"},{label:"Nigeria",value:"NG"},{label:"Niue",value:"NU"},{label:"Norfolk Island",value:"NF"},{label:"Northern Mariana Islands",value:"MP"},{label:"Norway",value:"NO"},{label:"Oman",value:"OM"},{label:"Pakistan",value:"PK"},{label:"Palau",value:"PW"},{label:"Palestinian Territory, Occupied",value:"PS"},{label:"Panama",value:"PA"},{label:"Papua New Guinea",value:"PG"},{label:"Paraguay",value:"PY"},{label:"Peru",value:"PE"},{label:"Philippines",value:"PH"},{label:"Pitcairn",value:"PN"},{label:"Poland",value:"PL"},{label:"Portugal",value:"PT"},{label:"Puerto Rico",value:"PR"},{label:"Qatar",value:"QA"},{label:"Reunion",value:"RE"},{label:"Romania",value:"RO"},{label:"Russian Federation",value:"RU"},{label:"Rwanda",value:"RW"},{label:"Saint Helena",value:"SH"},{label:"Saint Kitts and Nevis",value:"KN"},{label:"Saint Lucia",value:"LC"},{label:"Saint Pierre and Miquelon",value:"PM"},{label:"Saint Vincent and the Grenadines",value:"VC"},{label:"Samoa",value:"WS"},{label:"San Marino",value:"SM"},{label:"Sao Tome and Principe",value:"ST"},{label:"Saudi Arabia",value:"SA"},{label:"Senegal",value:"SN"},{label:"Serbia",value:"RS"},{label:"Seychelles",value:"SC"},{label:"Sierra Leone",value:"SL"},{label:"Singapore",value:"SG"},{label:"Slovakia",value:"SK"},{label:"Slovenia",value:"SI"},{label:"Solomon Islands",value:"SB"},{label:"Somalia",value:"SO"},{label:"South Africa",value:"ZA"},{label:"South Georgia and the South Sandwich Islands",value:"GS"},{label:"Spain",value:"ES"},{label:"Sri Lanka",value:"LK"},{label:"Sudan",value:"SD"},{label:"Suriname",value:"SR"},{label:"Svalbard and Jan Mayen",value:"SJ"},{label:"Swaziland",value:"SZ"},{label:"Sweden",value:"SE"},{label:"Switzerland",value:"CH"},{label:"Syrian Arab Republic",value:"SY"},{label:"Taiwan",value:"TW"},{label:"Tajikistan",value:"TJ"},{label:"Tanzania, United Republic of",value:"TZ"},{label:"Thailand",value:"TH"},{label:"Timor-Leste",value:"TL"},{label:"Togo",value:"TG"},{label:"Tokelau",value:"TK"},{label:"Tonga",value:"TO"},{label:"Trinidad and Tobago",value:"TT"},{label:"Tunisia",value:"TN"},{label:"Turkey",value:"TR"},{label:"Turkmenistan",value:"TM"},{label:"Turks and Caicos Islands",value:"TC"},{label:"Tuvalu",value:"TV"},{label:"Uganda",value:"UG"},{label:"Ukraine",value:"UA"},{label:"United Arab Emirates",value:"AE"},{label:"United Kingdom",value:"GB"},{label:"United States",value:"US"},{label:"United States Minor Outlying Islands",value:"UM"},{label:"Uruguay",value:"UY"},{label:"Uzbekistan",value:"UZ"},{label:"Vanuatu",value:"VU"},{label:"Venezuela",value:"VE"},{label:"Viet Nam",value:"VN"},{label:"Virgin Islands, British",value:"VG"},{label:"Virgin Islands, U.S.",value:"VI"},{label:"Wallis and Futuna",value:"WF"},{label:"Western Sahara",value:"EH"},{label:"Yemen",value:"YE"},{label:"Zambia",value:"ZM"},{label:"Zimbabwe",value:"ZW"}];var L=t(4107),B=t(508),g=t(6856);function G(e,o){if(1&e&&(a.TgZ(0,"mat-option",29),a._uU(1),a.qZA()),2&e){const l=o.$implicit;a.s9C("value",l.value),a.xp6(1),a.Oqu(l.label)}}const R=function(){return{fontSize:"x-small"}};function N(e,o){1&e&&(a.TgZ(0,"mat-error"),a._uU(1," Please accept terms & conditions to register "),a.qZA()),2&e&&a.Akn(a.DdM(2,R))}function F(e,o){1&e&&(a.TgZ(0,"div",30),a._UZ(1,"mat-spinner",31),a.qZA())}let P=(()=>{class e{constructor(l,u,r,v){this.loadingService=l,this.accountService=u,this.router=r,this.snackBar=v,this.isLoading$=this.loadingService.isLoading$,this.appRoute=i.H,this.countries=U}onRegisterSubmit(l){if(console.log(l),l.invalid)return;let u=Object.assign({},l.value);this.accountService.onRegister(u).subscribe({next:()=>{this.router.navigate([i.H.profileRel])},error:r=>this.snackBar.showSnackBar(r.error)})}}return e.\u0275fac=function(l){return new(l||e)(a.Y36(A.u),a.Y36(d.B),a.Y36(c.F0),a.Y36(S.c))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-register"]],decls:77,vars:8,consts:[[1,"mat-elevation-z6"],["inset","",1,"my-3"],[3,"ngSubmit"],["ngFormObj","ngForm"],[1,"row"],[1,"col-md-6"],["appearance","outline",1,"w-100"],["email","","matInput","","name","email","ngModel","","pattern","(?:^|\\s)[\\w!#$%&'*+/=?^`{|}~-](\\.?[\\w!#$%&'*+/=?^`{|}~-]+)*@\\w+[.-]?\\w*\\.[a-zA-Z]{2,3}\\b","placeholder","user@example.com","required","","type","email"],["aria-label","Select Country","name","country","ngModel","","required",""],[3,"value",4,"ngFor","ngForOf"],[1,"col-12","col-md-6"],["matInput","","name","password","ngModel","","placeholder","Use 8 or more characters with a mix of letters, numbers & symbols","pattern","^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$","required","","type","password"],["matInput","","name","repeatPassword","ngModel","","placeholder","Use 8 or more characters with a mix of letters, numbers & symbols","pattern","^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$","required","","type","password"],[1,"col-md-4"],["matInput","","name","givenName","ngModel","","placeholder","e.g. John","required","","type","text"],["matInput","","name","surname","ngModel","","placeholder","e.g. Smith","required","","type","text"],["matInput","","name","dob","readonly","true","aria-readonly","true","ngModel","","placeholder","dd/mm/yyyy","required","",3,"matDatepicker"],["matSuffix","",3,"for"],["dobPicker",""],[1,"row","mb-4"],[1,"col-12"],["color","primary","name","termsCheck","ngModel","","required","true","pattern","true|false"],["termsCheck",""],[1,"text-decoration-none","primaryLink",3,"routerLink"],[3,"style",4,"ngIf"],[1,"row","mb-3"],[1,"col-8","col-md-4","mx-auto"],["color","primary","mat-flat-button","","type","submit",1,"w-100"],["class","spinnerOverlay",4,"ngIf"],[3,"value"],[1,"spinnerOverlay"],["color","accent","diameter","50"]],template:function(l,u){if(1&l){const r=a.EpF();a.TgZ(0,"mat-card",0)(1,"mat-card-title"),a._uU(2,"Register"),a.qZA(),a._UZ(3,"mat-divider",1),a.TgZ(4,"mat-card-content")(5,"form",2,3),a.NdJ("ngSubmit",function(){a.CHM(r);const f=a.MAs(6);return u.onRegisterSubmit(f)}),a.TgZ(7,"div",4)(8,"div",5)(9,"mat-form-field",6)(10,"mat-label"),a._uU(11,"Email address"),a.qZA(),a._UZ(12,"input",7),a.TgZ(13,"mat-error"),a._uU(14,"Invalid email"),a.qZA()()(),a.TgZ(15,"div",5)(16,"mat-form-field",6)(17,"mat-label"),a._uU(18,"Country"),a.qZA(),a.TgZ(19,"mat-select",8),a.YNc(20,G,2,2,"mat-option",9),a.qZA(),a.TgZ(21,"mat-error"),a._uU(22,"Invalid country"),a.qZA()()()(),a.TgZ(23,"div",4)(24,"div",10)(25,"mat-form-field",6)(26,"mat-label"),a._uU(27,"Password"),a.qZA(),a._UZ(28,"input",11),a.TgZ(29,"mat-error"),a._uU(30,"Invalid password"),a.qZA()()(),a.TgZ(31,"div",10)(32,"mat-form-field",6)(33,"mat-label"),a._uU(34,"Repeat Password"),a.qZA(),a._UZ(35,"input",12),a.TgZ(36,"mat-error"),a._uU(37,"Must match password"),a.qZA()()()(),a.TgZ(38,"div",4)(39,"div",13)(40,"mat-form-field",6)(41,"mat-label"),a._uU(42,"Given Name"),a.qZA(),a._UZ(43,"input",14),a.TgZ(44,"mat-error"),a._uU(45,"Invalid given name"),a.qZA()()(),a.TgZ(46,"div",13)(47,"mat-form-field",6)(48,"mat-label"),a._uU(49,"Surname"),a.qZA(),a._UZ(50,"input",15),a.TgZ(51,"mat-error"),a._uU(52,"Invalid surname"),a.qZA()()(),a.TgZ(53,"div",13)(54,"mat-form-field",6)(55,"mat-label"),a._uU(56,"Date of Birth"),a.qZA(),a._UZ(57,"input",16)(58,"mat-datepicker-toggle",17)(59,"mat-datepicker",null,18),a.TgZ(61,"mat-error"),a._uU(62,"Invalid date"),a.qZA()()()(),a.TgZ(63,"div",19)(64,"div",20)(65,"mat-checkbox",21,22),a._uU(67," Agree to "),a.TgZ(68,"a",23),a._uU(69," terms and conditions"),a.qZA()(),a.YNc(70,N,2,3,"mat-error",24),a.qZA()(),a.TgZ(71,"div",25)(72,"div",26)(73,"button",27),a._uU(74,"Register"),a.qZA()()()()()(),a.YNc(75,F,2,0,"div",28),a.ALo(76,"async")}if(2&l){const r=a.MAs(6),v=a.MAs(60),f=a.MAs(66);a.xp6(20),a.Q6J("ngForOf",u.countries),a.xp6(37),a.Q6J("matDatepicker",v),a.xp6(1),a.Q6J("for",v),a.xp6(10),a.Q6J("routerLink",u.appRoute.termsAbs),a.xp6(2),a.Q6J("ngIf",r.submitted&&!f.checked),a.xp6(5),a.Q6J("ngIf",a.lcZ(76,6,u.isLoading$))}},directives:[b.a8,b.n5,Z.d,b.dn,n._Y,n.JL,n.F,s.KE,s.hX,T.Nt,n.Fj,n.on,n.JJ,n.On,n.c5,n.Q7,s.TO,L.gD,m.sg,B.ey,g.hl,g.nW,s.R9,g.Mq,p.oG,p.e_,c.yS,m.O5,M.lW,C.Ou],pipes:[m.Ov],styles:[""]}),e})(),w=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(l){return new(l||e)},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-forgot"]],decls:2,vars:0,template:function(l,u){1&l&&(a.TgZ(0,"p"),a._uU(1,"forgot works!"),a.qZA())},styles:[""]}),e})();var O=t(7841),E=t(8968);let K=(()=>{class e{constructor(l){this.accountService=l}ngOnInit(){this.accountService.showUser().subscribe({next:l=>console.log(l)})}}return e.\u0275fac=function(l){return new(l||e)(a.Y36(d.B))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-account"]],decls:2,vars:0,template:function(l,u){1&l&&(a.TgZ(0,"p"),a._uU(1,"account works!"),a.qZA())},styles:[""]}),e})(),J=(()=>{class e{}return e.\u0275fac=function(l){return new(l||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[c.Bz.forChild([{path:i.H.login,component:I},{path:i.H.register,component:P},{path:i.H.profile,component:K,canActivate:[E.P]},{path:i.H.forgot,component:w},{path:"",redirectTo:i.H.login,pathMatch:"full"}]),m.ez,n.u5,n.UX,O.s]]}),e})()}}]);