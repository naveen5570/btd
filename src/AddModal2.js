import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Image } from "react-native";

import shortid from "shortid";
import { Autocomplete, withKeyboardAwareScrollView } from "react-native-dropdown-autocomplete";
import GradientButton from "react-native-gradient-buttons";
import medicinedata from "../data/medicinedata"
import Globals from '../Globals';
const itemsPerRow = 5;

// Use data from an array...


class HomeScreen extends Component {
  handleSelectItem(item, index) {
    const { onDropdownClose } = this.props;
    onDropdownClose();
    console.log(item);
  }

  render() {
    const autocompletes = [...Array(1).keys()];
    const data = [

      "Porcine Mixact",

      "Aspart",

      "Inj. Actrapid",

      "Actrapid 40",

      "Inj. Apidra",

      "Basaglar",

      "Inj. Basal",

      "Inj. Basalog",

      "Inj. Basugine",

      "Inj. Bolus",

      "Concegna R",

      "Consegna 30/70",

      "Inj. Degludec",

      "Inj. Eglucent",

      "Eglucent 100",

      "Inj. Eglucent Mix 25",

      "Inj. Eglucent Mix 50",

      "Inj. Eglucent R",

      "Equisulin M30",

      "Fiasp",
      "Inj. Glargine",

      "Inj. Glaritus",

      "Inj. Humalog",

      "Humalog 100",

      "Humalog K WIK 200IU",

      "Inj. Humalog Mix 25",
      "Humalog Mix 25/100",

      "Inj. Humalog Mix 50",

      "Inj. Humalog mix 25/75",

      "Inj. Humalog mix 50/50",

      "Human Insulin 50/50",

      "Human Insulin-rDNA Origin",

      "Human Mixtard",

      "Human Mixtard 30",

      "Inj. Human Mixtard 50/50",

      "Inj. Human insulin 30/70",

      "Human mixtard 25",

      "Inj. Human mixtard 30 /70",

      "Human mixtard 40",

      "Human mixtard 50/50",

      "Inj. Humanactrapid+ Human insulatard",

      "Humanactripid",

      "Inj. Huminsulin 30/70",

      "Inj. Huminsulin 50/50",

      "Inj. Huminsulin N",

      "Inj. Huminsulin R",

      "Iglucent 100",

      "Inj. Lyxumia",

      "Inj. Insugen",

      "Inj. Insugen 30",

      "Inj. Insugen 30/70",

      "Inj. Insugen 50/50",

      "Insugen N",

      "Inj. Insugen R",

      "Inj. Insuglin",

      "Inj. Insulatard",

      "Inj. Insuman 25",

      "Inj. Insuman 25/75"
      ,

      "Inj. Insuman Combo 25"
      ,

      "Inj. Insugen 30"
      ,

      "Inj. Insugen 30/70"
      ,

      "Inj. Insugen 50/50"
      ,

      "Insugen N"
      ,

      "Inj. Insugen R"
      ,

      "Inj. Insuglin"
      ,

      "Inj. Insulatard"
      ,

      "Inj. Insuman 25"
      ,

      "Inj. Insuman 25/75"
      ,

      "Inj. Insuman Combo 25"
      ,

      "Inj. Lupisulin"
      ,

      "Inj. Lupisulin 30/70"
      ,

      "Lupisulin 50/50"
      ,

      "Lupisulin M 30/70"
      ,

      "Inj. Lupisulin M 50"
      ,

      "Inj. Lupisulin R"
      ,

      "Lupisulin R 40"
      ,

      "Lupisulin-N"
      ,

      "Inj. Lyxumia 20 micrograms"
      ,

      "Inj. Mixtard 30"
      ,

      "Inj. Mixtard 30/70"
      ,

      "Inj. Mixtard 40"
      ,

      "Inj. Mixtard 40/60"
      ,

      "Inj. Mixtard 50"
      ,

      "Inj. Mixtard 50/50"
      ,

      "Inj. NovoLog"
      ,

      "Inj. NovoMix 30/70"
      ,

      "Novomix"
      ,

      "Novomix 30"
      ,

      "Inj. Novomix 50"
      ,

      "Inj. Novomix 50/50"
      ,

      "Novopen 4"
      ,

      "Inj. Novorapid"
      ,

      "Prolomet XL 12.5"
      ,

      "Inj. Ryzodeg"
      ,

      "Ryzodeg 30/70"
      ,

      "Ryzodeg 40"
      ,

      "Inj. Test I"
      ,

      "Toujeo"
      ,

      "Tredio"
      ,

      "Inj. Tresiba"
      ,

      "Inj. Trulicity"
      ,

      "Trulicity 1.5"
      ,

      "Inj. Victoza"
      ,

      "Inj. Wosulin 30/70"
      ,

      "Inj. Wosulin 50/50"
      ,

      "Xultophy"
      ,

      "medtronic"
      ,

      "Tab. Afoglip M 20/500"
      ,

      "Tab. Semi Amaryl 0.5"
      ,

      "Tab. Glador M3 Forte"
      ,

      "Tab. Glimy M"
      ,

      "Tab. Glipon MF"
      ,

      "Tab. Glitaris 15"
      ,

      "Tab. K Glim m 1mg"
      ,

      "Tab. Motvyst"
      ,

      "Tab. Pioglitazone 15"
      ,

      "Tab. Sexagliptin 5"
      ,

      "Tab. Sitagliptin 100 mg"
      ,

      "Tab. Triexer 3"
      ,

      "Tab. Trivolib 2"
      ,

      "Tab. Vedapride M2"
      ,

      "Tab. Voglitor MD 0.3"
      ,

      "Tab. Voglyson"
      ,

      "Tab. Zilenta 20 mg"
      ,

      "Tab. Acarbose IP"
      ,

      "Tab. Actiglipt M 20/500"
      ,

      "Tab. Advog 0.2"
      ,

      "Tab. Advog 0.3"
      ,

      "Tab. Afoglip 20"
      ,

      "Tab. Ajaduo 25/5"
      ,

      "Tab. Ajaduo 5/10"
      ,

      "Tab. Alfabose 0.2"
      ,

      "Tab. Alfabose 0.3"
      ,

      "Tab. Amanza M 3"
      ,

      "Tab. Amaryl"
      ,

      "Tab. Amaryl 1"
      ,

      "Tab. Amaryl 2"
      ,

      "Tab. Amaryl 3"
      ,

      "Tab. Amaryl M 0.5"
      ,

      "Tab. Amaryl M 1"
      ,

      "Tab. Amaryl M1"
      ,

      "Tab. Amaryl M1 Forte"
      ,

      "Tab. Amaryl M2"
      ,

      "Tab. Amaryl M2 forte"
      ,

      "Tab. Amaryl MP2"
      ,

      "Tab. Amaryl MV 1"
      ,

      "Tab. Amaryl MV2"
      ,

      "Tab. Ameto GP1"
      ,

      "Tab. Ameto GP2"
      ,

      "Tab. Amaryl 1"
      ,

      "Tab. Amaryl 2"
      ,

      "Tab. Amaryl 3"
      ,

      "Tab. Amaryl M 1"
      ,

      "Tab. Apraglym M1"
      ,

      "Tab. Apriglim 1"
      ,

      "Tab. Apriglim M1"
      ,

      "Tab. Apriglim M2"
      ,

      "Tab. Apriglim MV 1"
      ,

      "Tab. Astromet 5 0.5"
      ,

      "Tab. Azneten"
      ,

      "Tab. Azneten m"
      ,

      "Tab. Azucon M"
      ,

      "Tab. Azukon M 80+500"
      ,

      "Tab. Azulix 1"
      ,

      "Tab. Azulix 1 MF Forte"
      ,

      "Tab. Azulix 1MF forte"
      ,

      "Tab. Azulix 2"
      ,

      "Tab. Azulix 2MF"
      ,

      "Tab. Azulix 2MF Forte"
      ,

      "Tab. Azulix 3"
      ,

      "Tab. Azulix 3 Mf"
      ,

      "Tab. Azulix 4"
      ,

      "Tab. Azulix 4 Mf Forte"
      ,

      "Tab. Azulix 4 mg"
      ,

      "Tab. Azulix MV 2/0.2"
      ,

      "Tab. Azulix Mf Forte"
      ,

      "Tab. Azulix Mf2"
      ,

      "Tab. Azulix Mr 2"
      ,

      "Tab. Azulix m 4"
      ,

      "Tab. Azulix mf 1"
      ,

      "Tab. BGR 34"
      ,

      "Tab. Barley grass pill"
      ,

      "Tab. Berberine"
      ,

      "Tab. Berbeshine"
      ,

      "Tab. Betaglim 1"
      ,

      "Tab. Betaglim 2"
      ,

      "Tab. Betaglim 3"
      ,

      "Tab. Betaglim M1"
      ,

      "Tab. Bigomet 500"
      ,

      "Tab. Bigomet Sr 1000"
      ,

      "Tab. Bigomet sr 500"
      ,

      "Tab. Biodib 15"
      ,

      "Tab. Biodib M 15"
      ,

      "Tab. Blisto 2 Mf"
      ,

      "Tab. Blisto 2 Mf"
      ,

      "Tab. Blisto 4 mf"
      ,

      "Tab. Blisto MF 1 SR"
      ,

      "Tab. Byetta 5"
      ,

      "Tab. CV Met 500"
      ,

      "Tab. CV Met Forte"
      ,

      "Tab. CYBLEX MV 40.2"
      ,

      "Tab. Canagliflozin 100"
      ,

      "Tab. Canagliflozin 300"
      ,

      "Tab. Carbophage Forte"
      ,

      "Tab. Carbophage G1"
      ,

      "Tab. Carbophage G2"
      ,

      "Tab. Carbophage SR 1"
      ,

      "Tab. Carbophage SR 1 gm"
      ,

      "Tab. Carbophage SR 500 mg"
      ,

      "Tab. Carbophage XR 1000"
      ,

      "Tab. Carbophage XR 500"
      ,

      "Tab. Carryl M 60 forte 60/1000"
      ,

      "Tab. Cetapin"
      ,

      "Tab. Cetapin 1000"
      ,

      "Tab. Cetapin 500"
      ,

      "Tab. Cetapin P 15"
      ,

      "Tab. Cetapin V 0.2"
      ,

      "Tab. Cetapin V 0.3"
      ,

      "Tab. Cetapin XR 1"
      ,

      "Tab. Cetapin XR 1000"
      ,

      "Tab. Cetapin XR 500"
      ,

      "Tab. Cgcron 80"
      ,

      "Tab. Citapin XR"
      ,

      "Tab. Cureformin 500"
      ,

      "Tab. Cyblex 40"
      ,

      "Tab. Cyblex 80"
      ,

      "Tab. Cyblex M 30 XR"
      ,

      "Tab. Cyblex M 40"
      ,

      "Tab. Cyblex M 60 XR"
      ,

      "Tab. Cyblex M 80"
      ,

      "Tab. Cyblex M SR"
      ,

      "Tab. Cyblex M forte 40"
      ,

      "Tab. Cyblex MV 40.3"
      ,

      "Tab. Cyblex MV 80.2"
      ,

      "Tab. Cyblex MV80.3"
      ,

      "Tab. Cyblex Mv 60+500+0.3"
      ,

      "Tab. Cyblex XR 30"
      ,

      "Tab. Cyblex XR 60"
      ,

      "Tab. Daonil"
      ,

      "Tab. Daonil 2.5"
      ,

      "Tab. Daonil 5"
      ,

      "Tab. Daonil M"
      ,

      "Tab. Dapagliflozin 10"
      ,

      "Tab. Dapagliflozin mf 1000 xr"
      ,

      "Tab. Dayclazide M 40"
      ,

      "Tab. Dayclazide M40"
      ,

      "Tab. Dayclazide M80"
      ,

      "Tab. Dayclazide MP"
      ,

      "Tab. Debifall"
      ,

      "Tab. Diabeclaz 60"
      ,

      "Tab. Diabecon Ds"
      ,

      "Tab. Diabend 80"
      ,

      "Tab. Diabend M"
      ,

      "Tab. Diabend M 80+500"
      ,

      "Tab. Diabeta 1000 SR"
      ,

      "Tab. Diabeta 500/5"
      ,

      "Tab. Diabeta SR 500"
      ,

      "Tab. Diabeton"
      ,

      "Tab. Diabetor"
      ,

      "Tab. Diabetrol 5/500"
      ,

      "Tab. Diabtetrol 250mg"
      ,

      "Tab. Dialon 1"
      ,

      "Tab. Diamet"
      ,

      "Tab. Diamicron"
      ,

      "Tab. Diamicron 40"
      ,

      "Tab. Diamicron 60"
      ,

      "Tab. Diamicron 60 SR"
      ,

      "Tab. Diamicron 60/500"
      ,

      "Tab. Diamicron 80"
      ,

      "Tab. Diamicron MR"
      ,

      "Tab. Diamicron MR 30"
      ,

      "Tab. Diamicron MR 60"
      ,

      "Tab. Diamicron MR30"
      ,

      "Tab. Diamicron XR 60"
      ,

      "Tab. Diamicron XR MET 50/500"
      ,

      "Tab. Diamicron XR MEX 60/500"
      ,

      "Tab. Diamicron XR Mex 500"
      ,

      "Tab. Diamicron XR mex 1"
      ,

      "Tab. Diamicron Xr30"
      ,

      "Tab. Diamicron Xr90"
      ,

      "Tab. Diamicron xr"
      ,

      "Tab. Dianorm"
      ,

      "Tab. Dianorm 40"
      ,

      "Tab. Dianorm 60"
      ,

      "Tab. Dianorm 80"
      ,

      "Tab. Dianorm M"
      ,

      "Tab. Dianorm M 500"
      ,

      "Tab. Dianorm M OD"
      ,

      "Tab. Dianorm M OD 1000"
      ,

      "Tab. Dianorm Od 30"
      ,

      "Tab. Dianorm-OD 60"
      ,

      "Tab. Diaperide 1"
      ,

      "Tab. Diapride 2"
      ,

      "Tab. Diapride M1 Forte"
      ,

      "Tab. Diapride M1 Forte SR"
      ,

      "Tab. Diapride M2"
      ,

      "Tab. Diapride M2 Forte"
      ,

      "Tab. Diapride M3 forte"
      ,

      "Tab. Diataal D"
      ,

      "Tab. Diatol"
      ,

      "Tab. Dibeta sr 1000"
      ,

      "Tab. Dibizide"
      ,

      "Tab. Dibizide M"
      ,

      "Tab. Dizid 80"
      ,

      "Tab. Dortmet G2"
      ,

      "Tab. EcoglipT"
      ,

      "Tab. Eglucent mix 25"
      ,

      "Tab. Eglucent mix 50"
      ,

      "Tab. Eliptin 20"
      ,

      "Tab. Eliptin M"
      ,

      "Tab. Eliptin M 20/500"
      ,

      "Tab. Eliptin M Forte"
      ,

      "Tab. Empagliflozin 10mg"
      ,

      "Tab. Empagliflozin 25"
      ,

      "Tab. Endoformin 500 mg"
      ,

      "Tab. Endoformin G1"
      ,

      "Tab. Endoformin Pg 2"
      ,

      "Tab. Endoformin SR 1000"
      ,

      "Tab. Endoformin SR 501"
      ,

      "Tab. Endoformin sr 500"
      ,

      "Tab. Endoformine Pg 2"
      ,

      "Tab. Endoformine Pg 2"
      ,

      "Tab. Eternex M"
      ,

      "Tab. Eternex T 20"
      ,

      "Tab. Euclide 40"
      ,

      "Tab. Euclide M"
      ,

      "Tab. Euclide M 30"
      ,

      "Tab. Euclide m 80/500"
      ,

      "Tab. Euglim 1"
      ,

      "Tab. Euglim 2"
      ,

      "Tab. Euglim M1"
      ,

      "Tab. Euglim M2"
      ,

      "Tab. Euglucon 5"
      ,

      "Tab. Eurepa 0.5"
      ,

      "Tab. Eurepa 1"
      ,

      "Tab. Eurepa 1 MF"
      ,

      "Tab. Eurepa 2"
      ,

      "Tab. Eurepa MF 1"
      ,

      "Tab. Eurepa MF2"
      ,

      "Tab. Exermet 1 gm"
      ,

      "Tab. Exermet 1000"
      ,

      "Tab. Exermet 500"
      ,

      "Tab. Exermet GM 501"
      ,

      "Tab. Exermet GM 502"
      ,

      "Tab. Exermet Gm Forte 2"
      ,

      "Tab. Exermet SR 500"
      ,

      "Tab. Flexiglim 0.5"
      ,

      "Tab. Formin 500"
      ,

      "Tab. Formin PG 2"
      ,

      "Tab. Formin Plus"
      ,

      "Tab. Formin Plus 500 Mg"
      ,

      "Tab. Formin SR 1000"
      ,

      "Tab. Formin SR 500"
      ,

      "Tab. Formin plus 500"
      ,

      "Tab. Forminal 500"
      ,

      "Tab. Forminal SR 1000"
      ,

      "Tab. Forminal SR 500"
      ,

      "Tab. Formit 500"
      ,

      "Tab. Forson pg 1"
      ,

      "Tab. Forson sr 1000"
      ,

      "Tab. Forxiga 10"
      ,

      "Tab. Forxiga 5"
      ,

      "Tab. Foxiga 10mg"
      ,

      "Tab. G - Reg SR 1000"
      ,

      "Tab. G - Reg SR 500"
      ,

      "Tab. G-met 1"
      ,

      "Tab. G-met 500"
      ,

      "Tab. G-met SR 500"
      ,

      "Tab. GLI M"
      ,

      "Tab. GLZ 80"
      ,

      "Tab. GLZ Plus"
      ,

      "Tab. GLZ Plus 80/500"
      ,

      "Tab. GLZ XR60"
      ,

      "Tab. GLZ toal"
      ,

      "Tab. GM2"
      ,

      "Tab. GMP-2"
      ,

      "Tab. GP 0.5"
      ,

      "Tab. GP 1"
      ,

      "Tab. GP1"
      ,

      "Tab. GP2"
      ,

      "Tab. GP3"
      ,

      "Tab. Galvasmet 50/850"
      ,

      "Tab. Galvus 50"
      ,

      "Tab. Galvus Met 50/1000"
      ,

      "Tab. Galvus Met 50/500"
      ,

      "Tab. Galvus Met 50/850"
      ,

      "Tab. Galvus Met 500"
      ,

      "Tab. Gemer 0.5"
      ,

      "Tab. Gemer 1"
      ,

      "Tab. Gemer 2"
      ,

      "Tab. Gemer 2 Ds"
      ,

      "Tab. Gemer 3 SR tab"
      ,

      "Tab. Gemer DS 1"
      ,

      "Tab. Gemer DS 2"
      ,

      "Tab. Gemer DS 3"
      ,

      "Tab. Gemer DS 4"
      ,

      "Tab. Gemer DS-1"
      ,

      "Tab. Gemer Forte"
      ,

      "Tab. Gemer Forte 1"
      ,

      "Tab. Gemer Forte 2"
      ,

      "Tab. Gemer Forte 3"
      ,

      "Tab. Gemer M2"
      ,

      "Tab. Gemer P 1"
      ,

      "Tab. Gemer P2"
      ,

      "Tab. Geminor 1"
      ,

      "Tab. Geminor 2"
      ,

      "Tab. Geminor M 3"
      ,

      "Tab. Geminor M 4 Forte"
      ,

      "Tab. Geminor M1"
      ,

      "Tab. Geminor M1 Forte"
      ,

      "Tab. Geminor M2"
      ,

      "Tab. Geminor M2 Forte"
      ,

      "Tab. Geminor MP 1"
      ,

      "Tab. Geminor MP 2"
      ,

      "Tab. Geminor mp2"
      ,

      "Tab. Gepride 1"
      ,

      "Tab. Gepride 2"
      ,

      "Tab. Gepride 3"
      ,

      "Tab. Gepride M 0.5"
      ,

      "Tab. Gepride M 1 Forte"
      ,

      "Tab. Gepride M 2 Forte"
      ,

      "Tab. Gepride M 3"
      ,

      "Tab. Gepride M 3 Forte"
      ,

      "Tab. Gepride M 4 Forte"
      ,

      "Tab. Gepride M1"
      ,

      "Tab. Gepride M2"
      ,

      "Tab. Gepride M3"
      ,

      "Tab. Gibtulio"
      ,

      "Tab. Gibtulio 10"
      ,

      "Tab. Gibtulio 25"
      ,

      "Tab. Gibtulio 25mg"
      ,

      "Tab. Gibtulio met"
      ,

      "Tab. Gimisave 1mg"
      ,

      "Tab. Glador 1"
      ,

      "Tab. Glador 2"
      ,

      "Tab. Glador 3"
      ,

      "Tab. Glador 4"
      ,

      "Tab. Glador M 1 Forte"
      ,

      "Tab. Glador M 2 Forte"
      ,

      "Tab. Glador M 3 Forte"
      ,

      "Tab. Glador M 4 Forte"
      ,

      "Tab. Glador M1"
      ,

      "Tab. Glador M2"
      ,

      "Tab. Glaritus"
      ,

      "Tab. Glavus 50"
      ,

      "Tab. Glazid M"
      ,

      "Tab. Glazid M 80+500"
      ,

      "Tab. Glenmark"
      ,

      "Tab. Gli 40"
      ,

      "Tab. Gli 80"
      ,

      "Tab. Gli M 1"
      ,

      "Tab. Gli M1"
      ,

      "Tab. Gliaris 15"
      ,

      "Tab. Gliaris 30"
      ,

      "Tab. Gliaris M 15"
      ,

      "Tab. Glibenclamide 5"
      ,

      "Tab. Gliclapack 30"
      ,

      "Tab. Gliclazide 120 mg"
      ,

      "Tab. Gliclazide 40"
      ,

      "Tab. Gliclazide 60mg"
      ,

      "Tab. Gliclazide 80"
      ,

      "Tab. Glide 5"
      ,

      "Tab. Glim M1"
      ,

      "Tab. Glimac M2"
      ,

      "Tab. Glimaday 1"
      ,

      "Tab. Glimaday 2"
      ,

      "Tab. Glimaday Forte"
      ,

      "Tab. Glimaday Forte 1"
      ,

      "Tab. Glimaday Forte 2"
      ,

      "Tab. Glimaday Forte 3"
      ,

      "Tab. Glimaday HS"
      ,

      "Tab. Glimaday P 1"
      ,

      "Tab. Glimaday P 2"
      ,

      "Tab. Glimcip"
      ,

      "Tab. Glimcip 1"
      ,

      "Tab. Glimcip 2"
      ,

      "Tab. Glimcip 3"
      ,

      "Tab. Glimcip 4"
      ,

      "Tab. Glimda"
      ,

      "Tab. Glimda 1"
      ,

      "Tab. Glimda 2"
      ,

      "Tab. Glimda MV 1"
      ,

      "Tab. Glimda MV 2"
      ,

      "Tab. Glimed Mf2 1000 Sr"
      ,

      "Tab. Glimeperide"
      ,

      "Tab. Glimeperide 1"
      ,

      "Tab. Glimeperide 2"
      ,

      "Tab. Glimeperide 4"
      ,

      "Tab. Glimepiride 0.5"
      ,

      "Tab. Glimepiride 1"
      ,

      "Tab. Glimepiride 2"
      ,

      "Tab. Glimepiride 3"
      ,

      "Tab. Glimepiride sandoz"
      ,

      "Tab. Glimer 2 mg"
      ,

      "Tab. Glimer 3"
      ,

      "Tab. Glimer1"
      ,

      "Tab. Glimestar 1"
      ,

      "Tab. Glimestar 2"
      ,

      "Tab. Glimestar 3"
      ,

      "Tab. Glimestar 4"
      ,

      "Tab. Glimestar M 2 Forte"
      ,

      "Tab. Glimestar M 3 Forte"
      ,

      "Tab. Glimestar M 4 Forte"
      ,

      "Tab. Glimestar M1"
      ,

      "Tab. Glimestar M1 forte"
      ,

      "Tab. Glimestar M2"
      ,

      "Tab. Glimestar M4"
      ,

      "Tab. Glimestar PM 4"
      ,

      "Tab. Glimestar PM2"
      ,

      "Tab. Glimester 4"
      ,

      "Tab. Glimester M 3"
      ,

      "Tab. Glimester PM 2"
      ,

      "Tab. GlimesterPm 1"
      ,

      "Tab. Glimet 250"
      ,

      "Tab. Glimet 250/2.5"
      ,

      "Tab. Glimet 500/5"
      ,

      "Tab. Glimet M 1"
      ,

      "Tab. Glimfirst 1"
      ,

      "Tab. Glimfirst 2"
      ,

      "Tab. Glimfirst 4"
      ,

      "Tab. Glimfirst M 3"
      ,

      "Tab. Glimfirst M1"
      ,

      "Tab. Glimfirst M2"
      ,

      "Tab. Glimfirst M2 Forte"
      ,

      "Tab. Glimfirst MP 1"
      ,

      "Tab. Glimfirst MP 2"
      ,

      "Tab. Glimfirst MV1"
      ,

      "Tab. Glimfirst MV2"
      ,

      "Tab. Glimgold MF 2"
      ,

      "Tab. Glimgold MF1"
      ,

      "Tab. Glimi"
      ,

      "Tab. Glimi 0.5"
      ,

      "Tab. Glimi 1"
      ,

      "Tab. Glimi 2"
      ,

      "Tab. Glimi 3"
      ,

      "Tab. Glimi M"
      ,

      "Tab. Glimi M 3"
      ,

      "Tab. Glimi M1"
      ,

      "Tab. Glimi M2"
      ,

      "Tab. Glimicure M 0.5/500"
      ,

      "Tab. Glimicure M2"
      ,

      "Tab. Glimidib M 2 SR"
      ,

      "Tab. Glimidib M1 SR"
      ,

      "Tab. Glimigold MF 1"
      ,

      "Tab. Glimin M1"
      ,

      "Tab. Glimiperide 1"
      ,

      "Tab. Glimiperide 2"
      ,

      "Tab. Glimiprex 1"
      ,

      "Tab. Glimiprex 2"
      ,

      "Tab. Glimiprex 3"
      ,

      "Tab. Glimiprex 4"
      ,

      "Tab. Glimiprex 500"
      ,

      "Tab. Glimiprex MF 1/1000"
      ,

      "Tab. Glimiprex MF 1/500"
      ,

      "Tab. Glimiprex MF 2"
      ,

      "Tab. Glimiprex MF 2/1000"
      ,

      "Tab. Glimiprex MF 2/500"
      ,

      "Tab. Glimiprex MF Forte 1/1000"
      ,

      "Tab. Glimiprex MF Forte 2/1000"
      ,

      "Tab. Glimiprime M1"
      ,

      "Tab. Glimisave 1"
      ,

      "Tab. Glimisave 1mg"
      ,

      "Tab. Glimisave 2"
      ,

      "Tab. Glimisave 3"
      ,

      "Tab. Glimisave 4"
      ,

      "Tab. Glimisave M 0.5"
      ,

      "Tab. Glimisave M 1"
      ,

      "Tab. Glimisave M 1 850"
      ,

      "Tab. Glimisave M 2"
      ,

      "Tab. Glimisave M 2 750"
      ,

      "Tab. Glimisave M 2 850"
      ,

      "Tab. Glimisave M 3"
      ,

      "Tab. Glimisave M 3 850"
      ,

      "Tab. Glimisave M 4 Forte"
      ,

      "Tab. Glimisave M 851"
      ,

      "Tab. Glimisave M 852"
      ,

      "Tab. Glimisave M 853"
      ,

      "Tab. Glimisave M1"
      ,

      "Tab. Glimisave M1 CP 305"
      ,

      "Tab. Glimisave M1 forte"
      ,

      "Tab. Glimisave M2"
      ,

      "Tab. Glimisave M2 Forte"
      ,

      "Tab. Glimisave M3 Forte"
      ,

      "Tab. Glimisave MV 1"
      ,

      "Tab. Glimisave MV 1.3"
      ,

      "Tab. Glimisave MV 2 Forte"
      ,

      "Tab. Glimisave MV 2.3"
      ,

      "Tab. Glimisave MV 3.3"
      ,

      "Tab. Glimisave MV3"
      ,

      "Tab. Glimisave Max 3"
      ,

      "Tab. Glimisave Max V Forte 1"
      ,

      "Tab. Glimisave Max V Forte 2"
      ,

      "Tab. Glimisave Max1"
      ,

      "Tab. Glimisave m2"
      ,

      "Tab. Glimisave m3. 3"
      ,

      "Tab. Glimisave max2"
      ,

      "Tab. Glimisave mv 3.3"
      ,

      "Tab. Glimisave mv2"
      ,

      "Tab. Glimison M2"
      ,

      "Tab. Glimison m1"
      ,

      "Tab. Glimistar M1"
      ,

      "Tab. Glimistar M2"
      ,

      "Tab. Glimistar M3"
      ,

      "Tab. Glimistar M4"
      ,

      "Tab. Glimitab m1"
      ,

      "Tab. Glimith MF3 1000 SR"
      ,

      "Tab. Glimp M1"
      ,

      "Tab. Glimp M1 Forte"
      ,

      "Tab. Glimp M2 SR"
      ,

      "Tab. Glimpid 1"
      ,

      "Tab. Glimpid 2 mg"
      ,

      "Tab. Glimpid 4"
      ,

      "Tab. Glimpid2"
      ,

      "Tab. Glimpil MF"
      ,

      "Tab. Glimpse"
      ,

      "Tab. Glimsave M3"
      ,

      "Tab. Glimser 2"
      ,

      "Tab. Glimstar M1"
      ,

      "Tab. Glimstar M2"
      ,

      "Tab. Glimsy M2"
      ,

      "Tab. Glimulin 2"
      ,

      "Tab. Glimulin 4 Mf Forte"
      ,

      "Tab. Glimulin MF 2"
      ,

      "Tab. Glimy"
      ,

      "Tab. Glimy 7.5"
      ,

      "Tab. Glimy 0.5"
      ,

      "Tab. Glimy 1"
      ,

      "Tab. Glimy 2"
      ,

      "Tab. Glimy 3"
      ,

      "Tab. Glimy 4"
      ,

      "Tab. Glimy M 3 Forte"
      ,

      "Tab. Glimy M forte"
      ,

      "Tab. Glimy M1"
      ,

      "Tab. Glimy M2"
      ,

      "Tab. Glimy M2 Forte"
      ,

      "Tab. Glimy MP 1"
      ,

      "Tab. Glimy MP 2"
      ,

      "Tab. Glimy MV 1"
      ,

      "Tab. Glimy MV 2"
      ,

      "Tab. Glinate 120"
      ,

      "Tab. Glinda 2"
      ,

      "Tab. Glinil 5"
      ,

      "Tab. Glinil M"
      ,

      "Tab. Glinil M 5/500"
      ,

      "Tab. Glipijub M 20"
      ,

      "Tab. Glipijub M forte"
      ,

      "Tab. Glipijub m 20"
      ,

      "Tab. Glipizide"
      ,

      "Tab. Glipizide"
      ,

      "Tab. Glipizide 10"
      ,

      "Tab. Glipizide 2.5"
      ,

      "Tab. Glipizide 5"
      ,

      "Tab. Glipsov"
      ,

      "Tab. Gliptamet 50/1000"
      ,

      "Tab. Glipten"
      ,

      "Tab. Gliptin"
      ,

      "Tab. Glirum MF"
      ,

      "Tab. Glisen 1"
      ,

      "Tab. Glisen 2"
      ,

      "Tab. Glisen 3"
      ,

      "Tab. Glisen MF 1"
      ,

      "Tab. Glisen MF 2"
      ,

      "Tab. Glisen MF Forte 1"
      ,

      "Tab. Glisen MF Forte 2"
      ,

      "Tab. Glisen PM 1"
      ,

      "Tab. Glisen PM 2"
      ,

      "Tab. Glisen VM 1"
      ,

      "Tab. Glisen VM 1/0.3"
      ,

      "Tab. Glisen VM 2"
      ,

      "Tab. Glitaris 7.5"
      ,

      "Tab. Glitaris M 15"
      ,

      "Tab. Glitaris M 7.5 / 500"
      ,

      "Tab. Glitaris M 7.5 Forte"
      ,

      "Tab. Glitz MF 80/500"
      ,

      "Tab. Glix 80"
      ,

      "Tab. Glix M"
      ,

      "Tab. Glix M 80"
      ,

      "Tab. Glix MR 30"
      ,

      "Tab. Glix MR 40"
      ,

      "Tab. Glix MR 60"
      ,

      "Tab. Gliz M"
      ,

      "Tab. Glizade 80"
      ,

      "Tab. Glizem 40"
      ,

      "Tab. Glizid 60"
      ,

      "Tab. Glizid 40"
      ,

      "Tab. Glizid 40/500"
      ,

      "Tab. Glizid 80"
      ,

      "Tab. Glizid M"
      ,

      "Tab. Glizid M 40"
      ,

      "Tab. Glizid M 80/500"
      ,

      "Tab. Glizid M OD 30"
      ,

      "Tab. Glizid M OD 60"
      ,

      "Tab. Glizid MR 30"
      ,

      "Tab. Glizid MR 60"
      ,

      "Tab. Glizid MV"
      ,

      "Tab. Glizid MV 80/500/0.3"
      ,

      "Tab. Glizid Total P 15"
      ,

      "Tab. Glizid Total P 7.5"
      ,

      "Tab. Glizid m 40/500"
      ,

      "Tab. Glizide 40"
      ,

      "Tab. Glizihenz 60"
      ,

      "Tab. Glizihenz M80"
      ,

      "Tab. Glizihenz m 80/500"
      ,

      "Tab. Glucar 25"
      ,

      "Tab. Glucar 50"
      ,

      "Tab. Gluco D 1.5/400"
      ,

      "Tab. Glucobay 25"
      ,

      "Tab. Glucobay 50"
      ,

      "Tab. Glucobay M 25"
      ,

      "Tab. Glucobay M 50"
      ,

      "Tab. Glucomust M"
      ,

      "Tab. Gluconorm 500"
      ,

      "Tab. Gluconorm G 0.5"
      ,

      "Tab. Gluconorm G 0.5 Forte"
      ,

      "Tab. Gluconorm G 3 Forte"
      ,

      "Tab. Gluconorm G 4 (500/4)"
      ,

      "Tab. Gluconorm G 4 Forte"
      ,

      "Tab. Gluconorm G I D"
      ,

      "Tab. Gluconorm G plus 1"
      ,

      "Tab. Gluconorm G plus 2"
      ,

      "Tab. Gluconorm G plus 3"
      ,

      "Tab. Gluconorm G1"
      ,

      "Tab. Gluconorm G1 forte"
      ,

      "Tab. Gluconorm G2"
      ,

      "Tab. Gluconorm G2 Forte"
      ,

      "Tab. Gluconorm G3"
      ,

      "Tab. Gluconorm G3 fort"
      ,

      "Tab. Gluconorm G4"
      ,

      "Tab. Gluconorm GP 2 Forte"
      ,

      "Tab. Gluconorm M"
      ,

      "Tab. Gluconorm M80"
      ,

      "Tab. Gluconorm P 15"
      ,

      "Tab. Gluconorm P 7.5"
      ,

      "Tab. Gluconorm PG 1"
      ,

      "Tab. Gluconorm PG1"
      ,

      "Tab. Gluconorm PG1 forte"
      ,

      "Tab. Gluconorm PG2"
      ,

      "Tab. Gluconorm PGL"
      ,

      "Tab. Gluconorm SR 500"
      ,

      "Tab. Gluconorm SR 850"
      ,

      "Tab. Gluconorm Sr 1000"
      ,

      "Tab. Gluconorm V 0.2"
      ,

      "Tab. Gluconorm V 0.3"
      ,

      "Tab. Gluconorm VG 1"
      ,

      "Tab. Gluconorm VG 1 Forte"
      ,

      "Tab. Gluconorm VG 1 Plus"
      ,

      "Tab. Gluconorm VG 2 Forte"
      ,

      "Tab. Gluconorm VG-2"
      ,

      "Tab. Gluconorm pg2"
      ,

      "Tab. Glucophage 500"
      ,

      "Tab. Glucophage 750"
      ,

      "Tab. Glucophage 850"
      ,

      "Tab. Glucophage SR"
      ,

      "Tab. Glucophage SR 500"
      ,

      "Tab. Glucophage XR"
      ,

      "Tab. Glucophage XR 1gm"
      ,

      "Tab. Glucored"
      ,

      "Tab. Glucored (2.5/400)"
      ,

      "Tab. Glucored 2.5/500"
      ,

      "Tab. Glucored 500"
      ,

      "Tab. Glucored Forte"
      ,

      "Tab. Glucored Forte (5/500)"
      ,

      "Tab. Glucored Forte 500"
      ,

      "Tab. Glucored Forte 850"
      ,

      "Tab. Glucored Forte SR"
      ,

      "Tab. Glucoryl"
      ,

      "Tab. Glucoryl M 0.5"
      ,

      "Tab. Glucoryl M 1 Forte"
      ,

      "Tab. Glucoryl M 3"
      ,

      "Tab. Glucoryl M 3 Forte"
      ,

      "Tab. Glucoryl M 4 Forte"
      ,

      "Tab. Glucoryl M Forte 2"
      ,

      "Tab. Glucoryl M1"
      ,

      "Tab. Glucoryl M2"
      ,

      "Tab. Glucoryl MP 1"
      ,

      "Tab. Glucoryl MP 2"
      ,

      "Tab. Glucoryl MV 1"
      ,

      "Tab. Glucoryl MV 1/0.3"
      ,

      "Tab. Glucoryl MV 2 Forte"
      ,

      "Tab. Glucoryl MV 2/0.3"
      ,

      "Tab. Glucoryl mv 2"
      ,

      "Tab. Glucoryl-MV1"
      ,

      "Tab. Glucosamine 500"
      ,

      "Tab. Glucosamine HCL 1500"
      ,

      "Tab. Glucosamine chondroitin"
      ,

      "Tab. Glucosamine sulfate"
      ,

      "Tab. Glucose health Amway"
      ,

      "Tab. Glucosol -XR 60"
      ,

      "Tab. Glucotrol Mf"
      ,

      "Tab. Glucovance 250"
      ,

      "Tab. Glucovance 500/5"
      ,

      "Tab. Gluformin 0.5"
      ,

      "Tab. Gluformin 1"
      ,

      "Tab. Gluformin 1000"
      ,

      "Tab. Gluformin 3 Forte"
      ,

      "Tab. Gluformin 500"
      ,

      "Tab. Gluformin 850"
      ,

      "Tab. Gluformin G 1 Forte"
      ,

      "Tab. Gluformin G 2"
      ,

      "Tab. Gluformin G 4"
      ,

      "Tab. Gluformin G1"
      ,

      "Tab. Gluformin G1 forte"
      ,

      "Tab. Gluformin G2 Forte"
      ,

      "Tab. Gluformin SR 1000"
      ,

      "Tab. Gluformin XL 1000"
      ,

      "Tab. Gluformin XL 500"
      ,

      "Tab. Gluformin Xl 250"
      ,

      "Tab. Gluformin g2"
      ,

      "Tab. Glurib M"
      ,

      "Tab. Glusens 1"
      ,

      "Tab. Glusens M2"
      ,

      "Tab. Glutide CR 30"
      ,

      "Tab. Glutide CR-60"
      ,

      "Tab. Gluzamet"
      ,

      "Tab. Glyade MR 30"
      ,

      "Tab. Glyboral 2.5"
      ,

      "Tab. Glyboral 5"
      ,

      "Tab. Glyborin 1.5"
      ,

      "Tab. Glyborin 5"
      ,

      "Tab. Glybovin 1.25 mg"
      ,

      "Tab. Glybovin 2.5"
      ,

      "Tab. Glybovin 2.5 mg"
      ,

      "Tab. Glybovin 5mg"
      ,

      "Tab. Glyburide 5mg"
      ,

      "Tab. Glycerna Powder"
      ,

      "Tab. Glycheck 40"
      ,

      "Tab. Glycheck 80"
      ,

      "Tab. Glychek 80"
      ,

      "Tab. Glychek M 40/500"
      ,

      "Tab. Glychek M forte"
      ,

      "Tab. Glycigon 80"
      ,

      "Tab. Glycigon M"
      ,

      "Tab. Glycigon-M 500"
      ,

      "Tab. Glycinorm 160"
      ,

      "Tab. Glycinorm 30 mg"
      ,

      "Tab. Glycinorm 40"
      ,

      "Tab. Glycinorm 60"
      ,

      "Tab. Glycinorm 80"
      ,

      "Tab. Glycinorm M 40/500"
      ,

      "Tab. Glycinorm M 60"
      ,

      "Tab. Glycinorm M 80"
      ,

      "Tab. Glycinorm M OD 30"
      ,

      "Tab. Glycinorm M OD 60"
      ,

      "Tab. Glycinorm OD 30"
      ,

      "Tab. Glycinorm OD 60"
      ,

      "Tab. Glycinorm Total 30"
      ,

      "Tab. Glycinorm Total 30/7.5"
      ,

      "Tab. Glycinorm Total 60"
      ,

      "Tab. Glycinorm Total 60/7.5"
      ,

      "Tab. Glycinorm m 40"
      ,

      "Tab. Glyciphage"
      ,

      "Tab. Glyciphage 1000"
      ,

      "Tab. Glyciphage 1mg"
      ,

      "Tab. Glyciphage 250"
      ,

      "Tab. Glyciphage 500"
      ,

      "Tab. Glyciphage 850"
      ,

      "Tab. Glyciphage G 2 Forte"
      ,

      "Tab. Glyciphage G 3 Forte"
      ,

      "Tab. Glyciphage G1"
      ,

      "Tab. Glyciphage G1 forte"
      ,

      "Tab. Glyciphage G2"
      ,

      "Tab. Glyciphage G2 forte"
      ,

      "Tab. Glyciphage P 15"
      ,

      "Tab. Glyciphage PG 1"
      ,

      "Tab. Glyciphage PG 2"
      ,

      "Tab. Glyciphage SR 1 gm"
      ,

      "Tab. Glyciphage SR 1000"
      ,

      "Tab. Glyciphage SR 500"
      ,

      "Tab. Glyciphage SR 850"
      ,

      "Tab. Glyciphage VG 1"
      ,

      "Tab. Glyciphage VG2"
      ,

      "Tab. Glyciphase 650"
      ,

      "Tab. Glycirite Gp1"
      ,

      "Tab. Glycomet"
      ,

      "Tab. Glycomet 1"
      ,

      "Tab. Glycomet 1000"
      ,

      "Tab. Glycomet 1000 SR"
      ,

      "Tab. Glycomet 250"
      ,

      "Tab. Glycomet 50/500"
      ,

      "Tab. Glycomet 500"
      ,

      "Tab. Glycomet 500 SR"
      ,

      "Tab. Glycomet 500 mg"
      ,

      "Tab. Glycomet 850"
      ,

      "Tab. Glycomet 850 sr"
      ,

      "Tab. Glycomet G4"
      ,

      "Tab. Glycomet GP 0.5"
      ,

      "Tab. Glycomet GP 1 forte"
      ,

      "Tab. Glycomet GP 1/850"
      ,

      "Tab. Glycomet GP 2/850"
      ,

      "Tab. Glycomet GP 3 Forte"
      ,

      "Tab. Glycomet GP 4"
      ,

      "Tab. Glycomet GP 5"
      ,

      "Tab. Glycomet GP forte"
      ,

      "Tab. Glycomet GP1"
      ,

      "Tab. Glycomet GP1 forte"
      ,

      "Tab. Glycomet GP2"
      ,

      "Tab. Glycomet GP2 Forte"
      ,

      "Tab. Glycomet GP3/850"
      ,

      "Tab. Glycomet M 80"
      ,

      "Tab. Glycomet SR 500"
      ,

      "Tab. Glycomet Sr 850"
      ,

      "Tab. Glycomet TRIO 1"
      ,

      "Tab. Glycomet TRIO 1/0.3"
      ,

      "Tab. Glycomet TRIO 2"
      ,

      "Tab. Glycomet TRIO 2 Forte"
      ,

      "Tab. Glycomet TRIO 2/0.3"
      ,

      "Tab. Glycomet TRIO Forte"
      ,

      "Tab. Glycomet TRIO Forte 1"
      ,

      "Tab. Glycomet TRIO Forte 2"
      ,

      "Tab. Glycomet TRIO Forte 3"
      ,

      "Tab. Glycomet Trio"
      ,

      "Tab. Glycomet gp 0.5 forte"
      ,

      "Tab. Glycomet gp 3"
      ,

      "Tab. Glycomet gp4 forte"
      ,

      "Tab. Glycomet trio 2 mg"
      ,

      "Tab. Glykind M"
      ,

      "Tab. Glykind M 80"
      ,

      "Tab. Glyloc 40"
      ,

      "Tab. Glyloc 80"
      ,

      "Tab. Glyloc M"
      ,

      "Tab. Glyloc M 80"
      ,

      "Tab. Glymat 80/500"
      ,

      "Tab. Glymet 1"
      ,

      "Tab. Glynase"
      ,

      "Tab. Glynase 30"
      ,

      "Tab. Glynase 5"
      ,

      "Tab. Glynase MF"
      ,

      "Tab. Glynase MF Forte"
      ,

      "Tab. Glynase XL 10"
      ,

      "Tab. Glynase XL 5"
      ,

      "Tab. Glypride 1"
      ,

      "Tab. Glypride 2"
      ,

      "Tab. Glypride 4"
      ,

      "Tab. Glypten 20 mg"
      ,

      "Tab. Glypten M 20mg"
      ,

      "Tab. Glypten M Forte 1000/20"
      ,

      "Tab. Glypten-M"
      ,

      "Tab. Glyree 0.5"
      ,

      "Tab. Glyree 1"
      ,

      "Tab. Glyree 2"
      ,

      "Tab. Glyree 3"
      ,

      "Tab. Glyree 4"
      ,

      "Tab. Glyree M 1"
      ,

      "Tab. Glyree M 1 Forte"
      ,

      "Tab. Glyree M 2"
      ,

      "Tab. Glyree M2 Forte"
      ,

      "Tab. Glyree MP 1"
      ,

      "Tab. Glyree MP 2"
      ,

      "Tab. Glyree MP1"
      ,

      "Tab. Glyree MV 1"
      ,

      "Tab. Glyree MV 2"
      ,

      "Tab. Glytop 10 Sr"
      ,

      "Tab. Glytop SR 10"
      ,

      "Tab. Glytop SR 2.5"
      ,

      "Tab. Glytop SR 5"
      ,

      "Tab. Glytrin met 20 /500"
      ,

      "Tab. Glyxambi 10/5"
      ,

      "Tab. Glyxambi 25/5"
      ,

      "Tab. Glyzet SR 1gm"
      ,

      "Tab. GmetFor 1"
      ,

      "Tab. Gmm V Forte"
      ,

      "Tab. Gp 4"
      ,

      "Tab. Gp. 0.5"
      ,

      "Tab. Gpride M3"
      ,

      "Tab. Gpride-M1"
      ,

      "Tab. Gulonorm G 3 Fort"
      ,

      "Tab. Gymnex"
      ,

      "Tab. Gzide XR 60"
      ,

      "Inj. Humalog 30/70"
      ,

      "Tab. Human Mixtard 30/20"
      ,

      "Inj. Human Mixtard 40"
      ,

      "Tab. Human mixtard 30 /70"
      ,

      "Inj. Huminsulin 30/70"
      ,

      "Tab. Humulin R"
      ,

      "Tab. IME 9"
      ,

      "Inj. INJ.SOLIQUA ( GLARGINE AND LIXISENA"
      ,

      "Tab. INSUGEN 30/70"
      ,

      "Tab. Ibgliptin 20"
      ,

      "Tab. Incresync 25/15"
      ,

      "Tab. Inogla 20 / 500"
      ,

      "Tab. Inogla M"
      ,

      "Tab. Inogla M 20/1000"
      ,

      "Tab. Insta 0.2"
      ,

      "Tab. Insta 0.3"
      ,

      "Tab. Instamet 50/500"
      ,

      "Tab. Insuglin"
      ,

      "Inj. Insulatard"
      ,

      "Inj. Insuman comb 25/75"
      ,

      "Tab. Invokana 100"
      ,

      "Tab. Invokana 300"
      ,

      "Tab. Ismet 500"
      ,

      "Tab. Ismet SR 500"
      ,

      "Tab. Ismosol -XR 60"
      ,

      "Tab. Isryl 1mg"
      ,

      "Tab. Isryl M 1"
      ,

      "Tab. Isryl M 2"
      ,

      "Tab. Istamet 1000"
      ,

      "Tab. Istamet 50/1000"
      ,

      "Tab. Istamet 50/500"
      ,

      "Tab. Istamet 500"
      ,

      "Tab. Istamet XR CP 100/1000"
      ,

      "Tab. Istavel 100"
      ,

      "Tab. Istavel 25"
      ,

      "Tab. Istavel 50"
      ,

      "Tab. J Ring 20"
      ,

      "Tab. JANUVIA 50 /500MG"
      ,

      "Tab. Jalra 25"
      ,

      "Tab. Jalra 50"
      ,

      "Tab. Jalra 50/500"
      ,

      "Tab. Jalra 50/850"
      ,

      "Tab. Jalra M"
      ,

      "Tab. Jalra M 50"
      ,

      "Tab. Jalra M 50/1000"
      ,

      "Tab. Jalra M 50/500"
      ,

      "Tab. Jalra M 50/850"
      ,

      "Tab. Jalra M 500"
      ,

      "Tab. Janumet"
      ,

      "Tab. Janumet 100"
      ,

      "Tab. Janumet 100/1000"
      ,

      "Tab. Janumet 1000"
      ,

      "Tab. Janumet 50 / 500"
      ,

      "Tab. Janumet 50/1000"
      ,

      "Tab. Janumet 50/500"
      ,

      "Tab. Janumet 50/850"
      ,

      "Tab. Janumet 500"
      ,

      "Tab. Janumet XR"
      ,

      "Tab. Janumet XR 50/1000"
      ,

      "Tab. Janumet XR 50/500"
      ,

      "Tab. Janumet XR CP 100 / 1000"
      ,

      "Tab. Janumet Xr Cp"
      ,

      "Tab. Januvia"
      ,

      "Tab. Januvia 100"
      ,

      "Tab. Januvia 150"
      ,

      "Tab. Januvia 25"
      ,

      "Tab. Januvia 50"
      ,

      "Tab. Jardiance 10"
      ,

      "Tab. Jardiance 10 mg"
      ,

      "Tab. Jardiance 20"
      ,

      "Tab. Jardiance 25"
      ,

      "Tab. Jardiance Met 1000+12.5"
      ,

      "Tab. Jardiance XR 12.5/500"
      ,

      "Tab. Jentadueto 2.5/1000"
      ,

      "Tab. Jubiglim M1"
      ,

      "Tab. Metformin"
      ,

      "Tab. Metformin 1000"
      ,

      "Tab. Metformin 250"
      ,

      "Tab. Metformin 500"
      ,

      "Tab. Metformin 750"
      ,

      "Tab. Metformin 850"
      ,

      "Tab. Metformin ER 1500"
      ,

      "Tab. Metformin HCL 1000"
      ,

      "Tab. Metformin HCL 500"
      ,

      "Tab. Metformin SR"
      ,

      "Tab. Metformin SR 1000"
      ,

      "Tab. Metformin SR 500"
      ,

      "Tab. Metformin SR 850"
      ,

      "Tab. Metformin2000"
      ,

      "Tab. Metium G2"
      ,

      "Tab. Metlibose plus 0.3"
      ,

      "Tab. Metlong -Ds 1000"
      ,

      "Tab. Metlong 500"
      ,

      "Tab. Metocarb Sr 500"
      ,

      "Tab. Metofix XL 1000"
      ,

      "Tab. Metol OD 1000"
      ,

      "Tab. Metride 1"
      ,

      "Tab. Metride 2"
      ,

      "Tab. Metride DS 1"
      ,

      "Tab. Metride Plus"
      ,

      "Tab. Metride Plus 1"
      ,

      "Tab. Metride Plus 2"
      ,

      "Tab. Metsar 1000 SR"
      ,

      "Tab. Metsar 500"
      ,

      "Tab. Metsmall"
      ,

      "Tab. Metsmall 1 gm"
      ,

      "Tab. Metsmall 1000"
      ,

      "Tab. Metsmall 500"
      ,

      "Tab. Metsmall 850"
      ,

      "Tab. Metsmall SR 500"
      ,

      "Tab. Metzia G2"
      ,

      "Tab. Mignar 25"
      ,

      "Tab. Mignar 50"
      ,

      "Tab. Mignar MF 25"
      ,

      "Tab. Mignar MF 50"
      ,

      "Inj. Mixtard 50/50"
      ,

      "Tab. Mopaday 15"
      ,

      "Tab. Mopaday forte"
      ,

      "Tab. Moringa pill"
      ,

      "Tab. Motivyst 300"
      ,

      "Tab. Moxilong 0.2"
      ,

      "Tab. Moxilong 0.3"
      ,

      "Tab. Moxocard 0.3"
      ,

      "Tab. Moxovas 0.2"
      ,

      "Tab. Moxovas 0.3"
      ,

      "Tab. Moxovas 0.3"
      ,

      "Tab. Nateglenide 120mg"
      ,

      "Tab. New Triclazone 80"
      ,

      "Tab. New Triglucored forte"
      ,

      "Tab. New triclazone 40"
      ,

      "Tab. Nishamalaki"
      ,

      "Inj. Novomix 30"
      ,

      "Inj. Novomix 30/70"
      ,

      "Inj. Novomix 50"
      ,

      "Tab. Novonorm 0.5"
      ,

      "Tab. Novonorm 1"
      ,

      "Tab. Novonorm 2"
      ,

      "Inj. Novorapid"
      ,

      "Tab. Nuformin SR 500"
      ,

      "Tab. Nuformin-G"
      ,

      "Tab. Nuzide M"
      ,

      "Tab. Nuzide XL-30"
      ,

      "Tab. Nuzide XL-60"
      ,

      "Tab. Obimet 1 SR"
      ,

      "Tab. Obimet 500"
      ,

      "Tab. Obimet GX 0.5"
      ,

      "Tab. Obimet GX forte-1"
      ,

      "Tab. Obimet GX-1"
      ,

      "Tab. Obimet GX-2"
      ,

      "Tab. Obimet GX2"
      ,

      "Tab. Obimet SR 500"
      ,

      "Tab. Obimet V 0.2"
      ,

      "Tab. Obimet V 0.3"
      ,

      "Tab. Obimet sr 1000"
      ,

      "Tab. Okamet 500"
      ,

      "Tab. Olglimide M1"
      ,

      "Tab. Olymprix 20"
      ,

      "Tab. Olymprix M"
      ,

      "Tab. Olymprix M 1000"
      ,

      "Tab. Olymprix M 20/500"
      ,

      "Tab. Olymprix M 500"
      ,

      "Tab. Ondero 5"
      ,

      "Tab. Ondero Met 2.5/1000"
      ,

      "Tab. Onderomet (2.5+850)"
      ,

      "Tab. Onderomet 2.5/500"
      ,

      "Tab. Onderomet 2.5/850"
      ,

      "Tab. Onglyza 2.5"
      ,

      "Tab. Onglyza 5"
      ,

      "Tab. Oramet 500"
      ,

      "Tab. Oxra 10 mg"
      ,

      "Tab. Oxra 5"
      ,

      "Tab. Oxramet 10/1000"
      ,

      "Tab. Oxramet 10/500"
      ,

      "Tab. Ozomet G1"
      ,

      "Tab. Ozomet VG 2"
      ,

      "Tab. Ozomet Vg2"
      ,

      "Tab. Ozomet Vg2"
      ,

      "Tab. PPG 0.2"
      ,

      "Tab. PPG 0.3"
      ,

      "Tab. PPG Met 0.3"
      ,

      "Tab. PPG met 0.2"
      ,

      "Tab. PPG met 0.2/500"
      ,

      "Tab. PPG met 0.3/500"
      ,

      "Tab. Patten M 20/500"
      ,

      "Tab. Path 15"
      ,

      "Tab. Path 7.5"
      ,

      "Tab. Path G2"
      ,

      "Tab. Petten M"
      ,

      "Tab. Pigma MF"
      ,

      "Tab. Piobit Gm2"
      ,

      "Tab. Pioglar 15"
      ,

      "Tab. Pioglar 30"
      ,

      "Tab. Pioglar 7.5"
      ,

      "Tab. Pioglar G"
      ,

      "Tab. Pioglar GF 32 capsule"
      ,

      "Tab. Pioglar MF 15/500"
      ,

      "Tab. Pioglar MF 7.5"
      ,

      "Tab. Pioglimet"
      ,

      "Tab. Pioglit 15"
      ,

      "Tab. Pioglit 30"
      ,

      "Tab. Pioglit 7.5"
      ,

      "Tab. Pioglit MF 7.5"
      ,

      "Tab. Pioglit-G"
      ,

      "Tab. Pioglitazone hcl 30 mg"
      ,

      "Tab. Piokind 15"
      ,

      "Tab. Piokind M-15"
      ,

      "Tab. Piolon 15"
      ,

      "Tab. Piomed 15 mg"
      ,

      "Tab. Pionorm GM"
      ,

      "Tab. Piopar 15"
      ,

      "Tab. Piopar 7.5"
      ,

      "Tab. Piopar 7.5 MF"
      ,

      "Tab. Piopod 15"
      ,

      "Tab. Piopod MF G1"
      ,

      "Tab. Piosys 15"
      ,

      "Tab. Piosys 30"
      ,

      "Tab. Piota Mf 15/500"
      ,

      "Tab. Pioz - MF"
      ,

      "Tab. Pioz - MF-G-1"
      ,

      "Tab. Pioz - MF-G-2"
      ,

      "Tab. Pioz - MF-G-2 forte"
      ,

      "Tab. Pioz -30"
      ,

      "Tab. Pioz 15"
      ,

      "Tab. Pioz 7.5"
      ,

      "Tab. Pioz MF 15"
      ,

      "Tab. Pioz MF 7.5"
      ,

      "Tab. Pioz Mf 7.5/500"
      ,

      "Tab. Poita Mf15/500"
      ,

      "Tab. Posmeal 0.3"
      ,

      "Tab. Prandial 0.2"
      ,

      "Tab. Prandial 0.2 MD"
      ,

      "Tab. Prandial 0.3"
      ,

      "Tab. Prandial M 0.2"
      ,

      "Tab. Prandial MD"
      ,

      "Tab. Prandial-M 0.2 & 0.3"
      ,

      "Tab. Pre-check M2"
      ,

      "Tab. Prebose 0.3"
      ,

      "Tab. Pricheck M1"
      ,

      "Tab. Pricheck M2"
      ,

      "Tab. Pricheck gm p1"
      ,

      "Tab. Primacal AT"
      ,

      "Tab. Prizide-M 40"
      ,

      "Tab. Prograf 1.5 mg"
      ,

      "Tab. Prominad"
      ,

      "Tab. Rainian XR 60/500"
      ,

      "Tab. Ramo 500"
      ,

      "Tab. Reclimet M"
      ,

      "Tab. Reclide 20"
      ,

      "Tab. Reclide 40"
      ,

      "Tab. Reclide 80"
      ,

      "Tab. Reclide M 80"
      ,

      "Tab. Reclide MR"
      ,

      "Tab. Reclide MR 30"
      ,

      "Tab. Reclide MR 60"
      ,

      "Tab. Reclide XR 30"
      ,

      "Tab. Reclide XR 60"
      ,

      "Tab. Reclide XR 60/500"
      ,

      "Tab. Reclimet"
      ,

      "Tab. Reclimet 500"
      ,

      "Tab. Reclimet 80/500"
      ,

      "Tab. Reclimet OD 30"
      ,

      "Tab. Reclimet OD 60"
      ,

      "Tab. Reclimet XR"
      ,

      "Tab. Reclimet XR 60"
      ,

      "Tab. Reclimet xr 60/500"
      ,

      "Tab. Regan 1mg"
      ,

      "Tab. Regan 2mg"
      ,

      "Tab. Remo 100"
      ,

      "Tab. Riax 2.5"
      ,

      "Tab. Riax 5"
      ,

      "Tab. Riax M 5/500"
      ,

      "Tab. Riax MXR 5/1000"
      ,

      "Tab. Riax MXR 5/500"
      ,

      "Tab. Riaz 5 mg"
      ,

      "Tab. Riomet 500"
      ,

      "Tab. Riomet DUO 2"
      ,

      "Tab. Riomet DUO-1"
      ,

      "Tab. Riomet OD 1000"
      ,

      "Tab. Riomet OD 500"
      ,

      "Tab. Riomet OD 850"
      ,

      "Tab. Saxagliptin"
      ,

      "Tab. Sefmet PGL 2"
      ,

      "Tab. Semi Amaryl"
      ,

      "Tab. Semi Daonil 2.5"
      ,

      "Tab. Semi Euglucon"
      ,

      "Tab. Semi Glynase"
      ,

      "Tab. Semi Reclimet"
      ,

      "Tab. Semi Reclimet 40/500"
      ,

      "Tab. Semi Reclimet 500"
      ,

      "Tab. Semi Tribet"
      ,

      "Tab. Semi Trigem 2"
      ,

      "Tab. Semi daonil"
      ,

      "Tab. Semi glizid M"
      ,

      "Tab. Semi tribet 2"
      ,

      "Tab. Semi-Tribet"
      ,

      "Tab. Semidaonil"
      ,

      "Tab. Semireclimet 40/500"
      ,

      "Tab. Siptin M 850mg"
      ,

      "Tab. Sitagliptin 50"
      ,

      "Tab. Stabose 0.2"
      ,

      "Tab. Stabose 0.3"
      ,

      "Tab. Stabose M 0.2"
      ,

      "Tab. Stabose M 0.3"
      ,

      "Tab. Stagmet"
      ,

      "Tab. Starvog 0.3"
      ,

      "Tab. Starvog 1"
      ,

      "Tab. Starvog M 0.3"
      ,

      "Tab. Starvog2"
      ,

      "Tab. Sugamet Mc 500"
      ,

      "Tab. Sugamide"
      ,

      "Tab. Sugasol M2 SR"
      ,

      "Tab. Sukkarto SR 1000mg"
      ,

      "Tab. Sulicent"
      ,

      "Tab. Sulisent 100"
      ,

      "Tab. Supraglip M"
      ,

      "Tab. Switglim 1/1000"
      ,

      "Tab. Switglim M 2/1000"
      ,

      "Tab. Switglim M 2/500"
      ,

      "Tab. Switglim M 4/500"
      ,

      "Tab. Switglim M2/1000"
      ,

      "Tab. Switglim MP 1/15"
      ,

      "Tab. Switglim MP2"
      ,

      "Tab. Switglim MV 1"
      ,

      "Tab. Switglim-M 1/500"
      ,

      "Tab. T Glip-M 500"
      ,

      "Tab. T Vobit 1"
      ,

      "Tab. T glip 20"
      ,

      "Tab. T- Vobit 1/0.2/500"
      ,

      "Tab. TENEBITE M 500"
      ,

      "Tab. TRIO 1"
      ,

      "Tab. TRIO 2"
      ,

      "Tab. Tab Ondero"
      ,

      "Tab. Tab.Ondero 5mg"
      ,

      "Tab. Tagon 20"
      ,

      "Tab. Teglipt 20"
      ,

      "Tab. Teglipt M 20/500"
      ,

      "Tab. Telniglip 20"
      ,

      "Tab. Telniglip M"
      ,

      "Tab. Temur 20 mg"
      ,

      "Tab. Temur M 20/500"
      ,

      "Tab. Ten M 20/500"
      ,

      "Tab. Ten dc 20"
      ,

      "Tab. Tenali 20"
      ,

      "Tab. Tenali 40"
      ,

      "Tab. Tenali M"
      ,

      "Tab. Tenali M 1000"
      ,

      "Tab. Tenali M 500"
      ,

      "Tab. Tenaligliptin 20"
      ,

      "Tab. Tenamit 20"
      ,

      "Tab. Tenamit m"
      ,

      "Tab. Tendia 20"
      ,

      "Tab. Tendia M"
      ,

      "Tab. Tendia M 20/500"
      ,

      "Tab. Tendia M Forte"
      ,

      "Tab. Tendia M Forte 20/1000"
      ,

      "Tab. Tendocare"
      ,

      "Tab. Tenebite 20 mg"
      ,

      "Tab. Tenebite M 20"
      ,

      "Tab. Tenebite M 20/500"
      ,

      "Tab. Teneblu"
      ,

      "Tab. Tenefit 20"
      ,

      "Tab. Tenefit M"
      ,

      "Tab. Tenefit M 20/500"
      ,

      "Tab. Teneglyn"
      ,

      "Tab. Teneglyn M"
      ,

      "Tab. Tenelegliptin 20"
      ,

      "Tab. Tenelegliptin M"
      ,

      "Tab. Teneli 20"
      ,

      "Tab. Tenelidib M 500 SR"
      ,

      "Tab. Teneliglip 20"
      ,

      "Tab. Teneliglip M"
      ,

      "Tab. Teneliglip M 1000"
      ,

      "Tab. Teneligliptin 20"
      ,

      "Tab. Teneligliptin 20/500"
      ,

      "Tab. Teneligliptin M 20/1000"
      ,

      "Tab. Teneligliptin m 20/500"
      ,

      "Tab. Tenepla 20"
      ,

      "Tab. Tenepla M1000"
      ,

      "Tab. Tenepride 20"
      ,

      "Tab. Tenepride M"
      ,

      "Tab. Tenepride M 1000"
      ,

      "Tab. Tenepride M 500"
      ,

      "Tab. Tenepure 20"
      ,

      "Tab. Tenepure M"
      ,

      "Tab. Tenepure M (500)"
      ,

      "Tab. Tenepure M 1000"
      ,

      "Tab. Tenepure M 20/500"
      ,

      "Tab. Tenepure M 500"
      ,

      "Tab. Teneza 20"
      ,

      "Tab. Teneza M 20/1000"
      ,

      "Tab. Teneza M 20/500"
      ,

      "Tab. Teneza M 500"
      ,

      "Tab. Tenglyn 20"
      ,

      "Tab. Tenglyn M"
      ,

      "Tab. Tenglyn M 20/500"
      ,

      "Tab. Tenglyn m 500"
      ,

      "Tab. Tenglypt 20"
      ,

      "Tab. Tenglyu 20"
      ,

      "Tab. Tenglyu M 1000"
      ,

      "Tab. Tenglyu M 500"
      ,

      "Tab. Tenipack 20"
      ,

      "Tab. Teniva 20"
      ,

      "Tab. Teniva M 20/500"
      ,

      "Tab. Tenlimac 20"
      ,

      "Tab. Tenlimac M"
      ,

      "Tab. Tenlimac M 1000"
      ,

      "Tab. Tenlimac M 20/500"
      ,

      "Tab. Tenlip 20"
      ,

      "Tab. Tenlip M 20/500"
      ,

      "Tab. Tenlip M 201000"
      ,

      "Tab. Tenlison 20"
      ,

      "Tab. Tenodax 20"
      ,

      "Tab. Tenomet"
      ,

      "Tab. Tensorin M"
      ,

      "Tab. Tensurin 20mg"
      ,

      "Tab. Tenumet 20/500"
      ,

      "Tab. Tenuvia 20"
      ,

      "Tab. Tenuvia M20/500"
      ,

      "Tab. Tenvia M forte"
      ,

      "Tab. Tenzulix 20"
      ,

      "Tab. Tenzulix M 1000"
      ,

      "Tab. Tenzulix M 20/500"
      ,

      "Tab. Tenzulix M 500"
      ,

      "Tab. Teva Pioglitazone 30"
      ,

      "Tab. Tezaglit"
      ,

      "Tab. Tglip M 1000"
      ,

      "Tab. Tglip- M 20/500"
      ,

      "Tab. Tiban 20"
      ,

      "Tab. Tiban M"
      ,

      "Tab. Tiban M 20/1000"
      ,

      "Tab. Tiban M 20/500"
      ,

      "Tab. Tglip 20mg"
      ,

      "Tab. Topglim M2"
      ,

      "tab.Tenlimac"
      ,

      "Tab. Tenlimac 20/500"
      ,

      "Tab. Trajenta"
      ,

      "Tab. Trajenta 10"
      ,

      "Tab. Trajenta 5"
      ,

      "Tab. Trajenta Duo"
      ,

      "Tab. Trajenta Duo 1000"
      ,

      "Tab. Trajenta Duo 2.5/1000"
      ,

      "Tab. Trajenta Duo 2.5/500"
      ,

      "Tab. Trajenta Duo 2.5/850"
      ,

      "Tab. Tribet 1"
      ,

      "Tab. Tribet 2"
      ,

      "Tab. Tribetrol"
      ,

      "Tab. Tribetrol 1 Forte"
      ,

      "Tab. Tribetrol 2"
      ,

      "Tab. Tribetrol 2 Forte"
      ,

      "Tab. Tribetrol forte"
      ,

      "Tab. Triblend VG 2"
      ,

      "Tab. Triblend Vg1"
      ,

      "Tab. Tribose M 500 /0.2"
      ,

      "Tab. Tricheck gm p1"
      ,

      "Tab. Tricyblex 60"
      ,

      "Tab. Triexer 2"
      ,

      "Tab. Triglemestar 1"
      ,

      "Tab. Triglimestar 1"
      ,

      "Tab. Triglimicure 2"
      ,

      "Tab. Triglimigem 2"
      ,

      "Tab. Triglimilife 2"
      ,

      "Tab. Triglimisave 1"
      ,

      "Tab. Triglimisave 1 HS"
      ,

      "Tab. Triglimisave 2"
      ,

      "Tab. Triglimisave 2 HS"
      ,

      "Tab. Triglimisave LS"
      ,

      "Tab. Triglimisave LS 1"
      ,

      "Tab. Triglimisave LS 2"
      ,

      "Tab. Triglimisave LS 2 Forte"
      ,

      "Tab. Triglimisave LS Forte 1"
      ,

      "Tab. Triglimisave LS forte 2"
      ,

      "Tab. Triglimisave Ls 2 mg"
      ,

      "Tab. Triglimisave Ls Forte"
      ,

      "Tab. Triglimisave SR"
      ,

      "Tab. Triglucoredforte"
      ,

      "Tab. Triglycomet"
      ,

      "Tab. Triglynase 1"
      ,

      "Tab. Triglynase 2"
      ,

      "Tab. Trimetaday 2"
      ,

      "Tab. Trimetride 2 mg"
      ,

      "Tab. Triobimet 1"
      ,

      "Tab. Triposmeal 1"
      ,

      "Tab. Triposmeal 2"
      ,

      "Tab. Tripride 1"
      ,

      "Tab. Tripride 2"
      ,

      "Tab. Trivoglitor 1"
      ,

      "Tab. Trivoglitor 2"
      ,

      "Tab. Trivoglitor forte 2/0.3/500"
      ,

      "Tab. Trivogo 1"
      ,

      "Tab. Trivogo 1/0.2"
      ,

      "Tab. Trivogo 2"
      ,

      "Tab. Trivogo 2/0.2"
      ,

      "Tab. Trivolib 1"
      ,

      "Tab. Trivolib 2"
      ,

      "Tab. Trivolib Forte"
      ,

      "Tab. Trivolib Forte 1"
      ,

      "Tab. Trivolib Forte 2"
      ,

      "Tab. Trivolib1"
      ,

      "Tab. Trizoryl 1"
      ,

      "inj. Trulicity 1.5"
      ,

      "Inj. Trulicity 1.5"
      ,

      "Tab. Vasupride VG2"
      ,

      "Tab. Vedapride M1"
      ,

      "Inj. Victoza 0.6"
      ,

      "Inj. Victoza 1.2"
      ,

      "Inj. Victoza 1.8"
      ,

      "Tab. Vidzid Xr 60"
      ,

      "Tab. Vigocil"
      ,

      "Tab. Vigocil 0.2"
      ,

      "Tab. Vigocil 0.3"
      ,

      "Tab. Vildagliptin"
      ,

      "Tab. Vildagliptin 50"
      ,

      "Tab. Vildagliptin 50/500"
      ,

      "Tab. Vildagliptin M 50/500"
      ,

      "Tab. Vincomo plus"
      ,

      "Tab. Vingose 0.2"
      ,

      "Tab. Vingose 0.3"
      ,

      "Tab. Vingose met 0.2/500"
      ,

      "Tab. Vingose met 0.3/500"
      ,

      "Tab. Vinicor XL H 50/12.5"
      ,

      "Tab. Viprotein"
      ,

      "Syr. Viscodyne"
      ,

      "Tab. Vision health with lutein"
      ,

      "Tab. Vit d 50 K"
      ,

      "Tab. Vobit 0.2"
      ,

      "Tab. Vobit 0.3"
      ,

      "Tab. Vobit M 0.2"
      ,

      "Tab. Vobit M 0.2/500"
      ,

      "Tab. Vobit M 0.3"
      ,

      "Tab. Vobit M 0.3/500"
      ,

      "Tab. Vobit MD 0.2"
      ,

      "Tab. Vobit MD 0.3"
      ,

      "Tab. Vobose 0.2"
      ,

      "Tab. Vobose 0.3"
      ,

      "Tab. Vobose M"
      ,

      "Tab. Vobose M 0.2 /500"
      ,

      "Tab. Vobose M 0.3 /500"
      ,

      "Tab. Vofid 0.3"
      ,

      "Tab. Vogipax Mp 275"
      ,

      "Tab. Vogistar GM2"
      ,

      "Tab. Vogli 0.2"
      ,

      "Tab. Vogli 0.3"
      ,

      "Tab. Vogli M"
      ,

      "Tab. Vogli M 0.2 /500"
      ,

      "Tab. Vogli M 0.3 /500"
      ,

      "Tab. Vogli Rapid 0.3/1"
      ,

      "Tab. Vogli Tri 0.2/500/40"
      ,

      "Tab. Vogli gm2 forte"
      ,

      "Tab. Vogli-rapid"
      ,

      "tab.vogli 0.3"
      ,

      "Tab. Voglibite 0.3mg"
      ,

      "Tab. Voglibite GM 1"
      ,

      "Tab. Voglibite GM 2"
      ,

      "Tab. Voglibite M 0.2"
      ,

      "Tab. Voglibite M 0.3/500"
      ,

      "Tab. Voglibose 0.2"
      ,

      "Tab. Voglibose 0.3"
      ,

      "Tab. Vogliboz 0.2"
      ,

      "Tab. Vogliboz 0.3"
      ,

      "Tab. Vogliboz GM 3"
      ,

      "Tab. Voglichew 0.3"
      ,

      "Tab. Voglidib 0.3"
      ,

      "Tab. Voglikem 0.2"
      ,

      "Tab. Voglikem 0.3"
      ,

      "Tab. Voglikem M 0.2 Forte (1000 )"
      ,

      "Tab. Voglikem M 0.2/500"
      ,

      "Tab. Voglikem M 0.3/500"
      ,

      "Tab. Voglimac 0.2"
      ,

      "Tab. Voglimac 0.3"
      ,

      "Tab. Voglimac GM 2"
      ,

      "Tab. Voglimac MF 0.3"
      ,

      "Tab. Voglimeal MR 0.3"
      ,

      "Tab. Voglimet 0.2"
      ,

      "Tab. Voglimet 0.3"
      ,

      "Tab. Voglimet 500"
      ,

      "Tab. Voglimet GM"
      ,

      "Tab. Voglinorm 0.3"
      ,

      "Tab. Voglinorm GM 1"
      ,

      "Tab. Voglinorm GM 2"
      ,

      "Tab. Voglirapid 0.3/1.0"
      ,

      "Tab. Voglispan 0.3"
      ,

      "Tab. Voglistar"
      ,

      "Tab. Voglistar GM 2"
      ,

      "Tab. Voglistar GM1"
      ,

      "Tab. Voglistar MD 0.3"
      ,

      "Tab. Voglitab 0.2"
      ,

      "Tab. Voglitab 0.3"
      ,

      "Tab. Voglitab M 0.3"
      ,

      "Tab. Voglitor 0.2"
      ,

      "Tab. Voglitor 0.3"
      ,

      "Tab. Voglitor 100"
      ,

      "Tab. Voglitor M (0.2+500)"
      ,

      "Tab. Voglitor M (0.2/500)"
      ,

      "Tab. Voglitor MD 0.2"
      ,

      "Tab. Voglitor MF 0.2/500"
      ,

      "Tab. Voglitor MF forte 0.2"
      ,

      "Tab. Voglitor MF0.3"
      ,

      "Tab. Voglitov 0.2"
      ,

      "Tab. Voglitov 0.3"
      ,

      "Tab. Voglitrio 0.2"
      ,

      "Tab. Vogliwok 0.2"
      ,

      "Tab. Vogliwok 0.3"
      ,

      "Tab. Voglix Trio 2"
      ,

      "Tab. Vogloyd 0.3"
      ,

      "Tab. Voglyson"
      ,

      "Tab. Vogo 0.3"
      ,

      "Tab. Vogo 0.2"
      ,

      "Tab. Vogs 0.2"
      ,

      "Tab. Vogs 0.3"
      ,

      "Tab. Vogs GM"
      ,

      "Tab. Vogs GM 2"
      ,

      "Tab. Vogs M 0.3"
      ,

      "Tab. Vokem MF"
      ,

      "Tab. Vokem MF 3"
      ,

      "Tab. Volibo"
      ,

      "Tab. Volibo -M 0.3 /500"
      ,

      "Tab. Volibo 0.2"
      ,

      "Tab. Volibo 0.3"
      ,

      "Tab. Volibo M 0.2/500"
      ,

      "Tab. Volicure M 0.3"
      ,

      "Tab. Volicure Trio 1 mg"
      ,

      "Tab. Volicure Trio 2 mg"
      ,

      "Tab. Voliphage"
      ,

      "Tab. Voliphage 0.2"
      ,

      "Tab. Voliphage 0.3"
      ,

      "Tab. Voliphage-M 0.2/500"
      ,

      "Tab. Voliphage-M 0.3/500"
      ,

      "Tab. Volix 0.2"
      ,

      "Tab. Volix 0.3"
      ,

      "Tab. Volix M 0.2"
      ,

      "Tab. Volix M 0.2/500"
      ,

      "Tab. Volix M 0.3/500"
      ,

      "Tab. Volix trio"
      ,

      "Tab. Volix trio -1 0.2 /500/1"
      ,

      "Tab. Volix trio -2 0.2 /500/2"
      ,

      "Tab. Volix trio 1"
      ,

      "Tab. Volix trio 2"
      ,

      "Tab. Volmet Trio"
      ,

      "Tab. Volta Neuran DN"
      ,

      "Tab. Voltaflam 50"
      ,

      "Tab. Vose 0.3"
      ,

      "Tab. Vozuca 0.2"
      ,

      "Tab. Vozuca M 0.2"
      ,

      "Tab. Vozuca - M activ 60s 0.3"
      ,

      "Tab. Vozuca 0.3"
      ,

      "Tab. Vozuca M 0.3"
      ,

      "Tab. Vozuca M activ 60s 0.2"
      ,

      "Tab. Vozuca active 0.3"
      ,

      "Tab. Vozuka Active 0.3"
      ,

      "Tab. Vysom M50/500"
      ,

      "Tab. Vysov 50"
      ,

      "Tab. Vysov M 50/1000"
      ,

      "Tab. Vysov M 50/500"
      ,

      "Tab. Vysov M 50/850"
      ,

      "Tab. Walaphage 500"
      ,

      "Tab. Walaphage 850"
      ,

      "Tab. Walaphage GP"
      ,

      "Tab. Walaphage GP 1"
      ,

      "Tab. Walaphage GP 2"
      ,

      "Tab. Walformin 500"
      ,

      "Tab. Walformin 80/500"
      ,

      "Tab. Wheatgrass pill"
      ,

      "Tab. X met 250"
      ,

      "Tab. Xigduo"
      ,

      "Inj. Xigduo 5 mg/1,000"
      ,

      "Tab. Xigduo 5 mg/1,000"
      ,

      "Tab. Xigduo XR 10 / 500"
      ,

      "Tab. Xigduo XR 10/1000"
      ,

      "Tab. Xilia 2"
      ,

      "Tab. Xilia M1"
      ,

      "Tab. Xilia M2"
      ,

      "Tab. Xmet"
      ,

      "Tab. Xmet 250"
      ,

      "Tab. Xmet SR 500"
      ,

      "Tab. Xmet Trio"
      ,

      "Tab. Xmet Trio 2"
      ,

      "Tab. Zarbose M 0.3"
      ,

      "Tab. Zebose 3M"
      ,

      "Tab. Zemiglo 50"
      ,

      "Tab. Zeptin M 20/500"
      ,

      "Tab. Zeptin M 20/500"
      ,

      "Tab. Zicla M"
      ,

      "Tab. Zicron 40"
      ,

      "Tab. Zidmet Forte"
      ,

      "Tab. Ziglim 1"
      ,

      "Tab. Ziglim 2"
      ,

      "Tab. Ziglim M 1"
      ,

      "Tab. Ziglim M2"
      ,

      "Tab. Zilenta"
      ,

      "Tab. Zilenta 20"
      ,

      "Tab. Zilenta M"
      ,

      "Tab. Zilenta M 20/500"
      ,

      "Tab. Zilenta M forte"
      ,

      "Tab. Zita 100"
      ,

      "Tab. Zita 20"
      ,

      "Tab. Zita 50"
      ,

      "Tab. Zita Plus 100"
      ,

      "Tab. Zita plus"
      ,

      "Tab. Zita plus 20"
      ,

      "Tab. Zita plus 20/1000"
      ,

      "Tab. ZitaMet MR 60"
      ,

      "Tab. Zitamet 50/500"
      ,

      "Tab. Zitamet PLus"
      ,

      "Tab. Zitamet plus (20/500)"
      ,

      "Tab. Zitamet plus 20/1000"
      ,

      "Tab. Zitamet plus 20/500"
      ,

      "Tab. Zitaplus 20"
      ,

      "Tab. Ziten"
      ,

      "Tab. Ziten 10"
      ,

      "Tab. Ziten 20"
      ,

      "Tab. Ziten M 20/1000"
      ,

      "Tab. Ziten M 20/500"
      ,

      "Tab. Ziten m"
      ,

      "Tab. Zoform 500 SR"
      ,

      "Tab. Zomelis"
      ,

      "Tab. Zomelis 50"
      ,

      "Tab. Zomelis Met 50"
      ,

      "Tab. Zomelis met 50/1000"
      ,

      "Tab. Zomelis met 50/500"
      ,

      "Tab. Zomet SR 1000"
      ,

      "Tab. Zomet SR 500"
      ,

      "Tab. Zorbten MF 1000"
      ,

      "Tab. Zorly M3"
      ,

      "Tab. Zorly MF 3/850"
      ,

      "Tab. Zoryl 0.5"
      ,

      "Tab. Zoryl 1"
      ,

      "Tab. Zoryl 2"
      ,

      "Tab. Zoryl 3"
      ,

      "Tab. Zoryl 4"
      ,

      "Tab. Zoryl M 0.5"
      ,

      "Tab. Zoryl M 1 Forte"
      ,

      "Tab. Zoryl M 2"
      ,

      "Tab. Zoryl M 2 forte"
      ,

      "Tab. Zoryl M 3 Forte"
      ,

      "Tab. Zoryl M 4 Forte"
      ,

      "Tab. Zoryl M1"
      ,

      "Tab. Zoryl M2 Forte"
      ,

      "Tab. Zoryl M3"
      ,

      "Tab. Zoryl M4"
      ,

      "Tab. Zoryl M4"
      ,

      "Tab. Zoryl MF 3/850"
      ,

      "Tab. Zoryl MP 1"
      ,

      "Tab. Zoryl MP 2"
      ,

      "Tab. Zoryl MV1"
      ,

      "Tab. Zoryl MV2"
      ,

      "Tab. Zurig 40"
      ,

      "Tab. Zuvog M 0.2"
      ,

      "Tab. citapen 500"
      ,

      "Tab. gibtulio 25 mg"
      ,

      "Tab. glimepiride sandoz 2"
      ,

      "Inj. mixtard 30/30"
      ,

      "Tab. pioz MF 15/500"
      ,

      "Tab. semi daonil 2.5"
      ,

      "Tab. tripride 2"
      ,

      "Tab. zeformin XR 60"

    ];

    const apiUrl = "http://192.168.1.142/User_Project/auth-screens/src/med.php";

    const { scrollToInput, onDropdownClose, onDropdownShow } = this.props;

    return (
      <View style={{ marginTop: 10, marginBottom: -70 }}>

        <SafeAreaView>

          {autocompletes.map(() => (
            <Autocomplete
              data={data}
              key={shortid.generate()}
              style={styles.input}
              scrollToInput={ev => scrollToInput(ev)}
              handleSelectItem={(item, id) => this.handleSelectItem(item, id)}
              onDropdownClose={() => onDropdownClose()}
              onDropdownShow={() => onDropdownShow()}


              minimumCharactersCount={2}
              highlightText
              valueExtractor={item => item}
              rightContent
              rightTextExtractor={item => item.id}
            />
          ))}



        </SafeAreaView>


      </View>



    );
  }
}
const styles = StyleSheet.create({
  autocompletesContainer: {
    paddingTop: 30,
    zIndex: 1,
    width: "100%",
    paddingHorizontal: 8,
    marginTop: 100,
  },
  input: { maxHeight: 40 },
  inputContainer: {
    display: "flex",
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#c7c6c1",
    paddingVertical: 13,
    paddingLeft: 12,
    paddingRight: "5%",
    width: "100%",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  plus: {
    position: "absolute",
    left: 15,
    top: 10,
  },
});

export default withKeyboardAwareScrollView(HomeScreen);
