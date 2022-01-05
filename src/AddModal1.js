import React, { Component } from 'react';
import {
  FlatList, StyleSheet, Text, View, Image, Alert,
  Platform, TouchableHighlight, Dimensions,
  TextInput, Picker, YellowBox, SafeAreaView, Vibration
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';
import AutoComplete from 'react-native-autocomplete-modal';

//import { Notifications } from 'expo';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import Globals from '../Globals';


const countries = [
  {
    country: {
      name: "Porcine Mixact"
    }
  },
  {
    country: {
      name: "Aspart"
    }
  },
  {
    country: {
      name: "Inj. Actrapid"
    }
  },
  {
    country: {
      name: "Actrapid 40"
    }
  },
  {
    country: {
      name: "Inj. Apidra"
    }
  },
  {
    country: {
      name: "Basaglar"
    }
  },
  {
    country: {
      name: "Inj. Basal"
    }
  },
  {
    country: {
      name: "Inj. Basalog"
    }
  },
  {
    country: {
      name: "Inj. Basugine"
    }
  },
  {
    country: {
      name: "Inj. Bolus"
    }
  },
  {
    country: {
      name: "Concegna R"
    }
  },
  {
    country: {
      name: "Consegna 30/70"
    }
  },
  {
    country: {
      name: "Inj. Degludec"
    }
  },
  {
    country: {
      name: "Inj. Eglucent"
    }
  },
  {
    country: {
      name: "Eglucent 100"
    }
  },
  {
    country: {
      name: "Inj. Eglucent Mix 25"
    }
  },
  {
    country: {
      name: "Inj. Eglucent Mix 50"
    }
  },
  {
    country: {
      name: "Inj. Eglucent R"
    }
  },
  {
    country: {
      name: "Equisulin M30"
    }
  },
  {
    country: {
      name: "Fiasp"
    }
  },
  {
    country: {
      name: "Inj. Glargine"
    }
  },
  {
    country: {
      name: "Inj. Glaritus"
    }
  },
  {
    country: {
      name: "Inj. Humalog"
    }
  },
  {
    country: {
      name: "Humalog 100"
    }
  },
  {
    country: {
      name: "Humalog K WIK 200IU"
    }
  },
  {
    country: {
      name: "Inj. Humalog Mix 25"
    }
  },
  {
    country: {
      name: "Humalog Mix 25/100"
    }
  },
  {
    country: {
      name: "Inj. Humalog Mix 50"
    }
  },
  {
    country: {
      name: "Inj. Humalog mix 25/75"
    }
  },
  {
    country: {
      name: "Inj. Humalog mix 50/50"
    }
  },
  {
    country: {
      name: "Human Insulin 50/50"
    }
  },
  {
    country: {
      name: "Human Insulin-rDNA Origin"
    }
  },
  {
    country: {
      name: "Human Mixtard"
    }
  },
  {
    country: {
      name: "Human Mixtard 30"
    }
  },
  {
    country: {
      name: "Inj. Human Mixtard 50/50"
    }
  },
  {
    country: {
      name: "Inj. Human insulin 30/70"
    }
  },
  {
    country: {
      name: "Human mixtard 25"
    }
  },
  {
    country: {
      name: "Inj. Human mixtard 30 /70"
    }
  },
  {
    country: {
      name: "Human mixtard 40"
    }
  },
  {
    country: {
      name: "Human mixtard 50/50"
    }
  },
  {
    country: {
      name: "Inj. Humanactrapid+ Human insulatard"
    }
  },
  {
    country: {
      name: "Humanactripid"
    }
  },
  {
    country: {
      name: "Inj. Huminsulin 30/70"
    }
  },
  {
    country: {
      name: "Inj. Huminsulin 50/50"
    }
  },
  {
    country: {
      name: "Inj. Huminsulin N"
    }
  },
  {
    country: {
      name: "Inj. Huminsulin R"
    }
  },
  {
    country: {
      name: "Iglucent 100"
    }
  },
  {
    country: {
      name: "Inj. Lyxumia"
    }
  },
  {
    country: {
      name: "Inj. Insugen"
    }
  },
  {
    country: {
      name: "Inj. Insugen 30"
    }
  },
  {
    country: {
      name: "Inj. Insugen 30/70"
    }
  },
  {
    country: {
      name: "Inj. Insugen 50/50"
    }
  },
  {
    country: {
      name: "Insugen N"
    }
  },
  {
    country: {
      name: "Inj. Insugen R"
    }
  },
  {
    country: {
      name: "Inj. Insuglin"
    }
  },
  {
    country: {
      name: "Inj. Insulatard"
    }
  },
  {
    country: {
      name: "Inj. Insuman 25"
    }
  },
  {
    country: {
      name: "Inj. Insuman 25/75"
    }
  },
  {
    country: {
      name: "Inj. Insuman Combo 25"
    }
  },
  {
    country: {
      name: "Inj. Insugen 30"
    }
  },
  {
    country: {
      name: "Inj. Insugen 30/70"
    }
  },
  {
    country: {
      name: "Inj. Insugen 50/50"
    }
  },
  {
    country: {
      name: "Insugen N"
    }
  },
  {
    country: {
      name: "Inj. Insugen R"
    }
  },
  {
    country: {
      name: "Inj. Insuglin"
    }
  },
  {
    country: {
      name: "Inj. Insulatard"
    }
  },
  {
    country: {
      name: "Inj. Insuman 25"
    }
  },
  {
    country: {
      name: "Inj. Insuman 25/75"
    }
  },
  {
    country: {
      name: "Inj. Insuman Combo 25"
    }
  },
  {
    country: {
      name: "Inj. Lupisulin"
    }
  },
  {
    country: {
      name: "Inj. Lupisulin 30/70"
    }
  },
  {
    country: {
      name: "Lupisulin 50/50"
    }
  },
  {
    country: {
      name: "Lupisulin M 30/70"
    }
  },
  {
    country: {
      name: "Inj. Lupisulin M 50"
    }
  },
  {
    country: {
      name: "Inj. Lupisulin R"
    }
  },
  {
    country: {
      name: "Lupisulin R 40"
    }
  },
  {
    country: {
      name: "Lupisulin-N"
    }
  },
  {
    country: {
      name: "Inj. Lyxumia 20 micrograms"
    }
  },
  {
    country: {
      name: "Inj. Mixtard 30"
    }
  },
  {
    country: {
      name: "Inj. Mixtard 30/70"
    }
  },
  {
    country: {
      name: "Inj. Mixtard 40"
    }
  },
  {
    country: {
      name: "Inj. Mixtard 40/60"
    }
  },
  {
    country: {
      name: "Inj. Mixtard 50"
    }
  },
  {
    country: {
      name: "Inj. Mixtard 50/50"
    }
  },
  {
    country: {
      name: "Inj. NovoLog"
    }
  },
  {
    country: {
      name: "Inj. NovoMix 30/70"
    }
  },
  {
    country: {
      name: "Novomix"
    }
  },
  {
    country: {
      name: "Novomix 30"
    }
  },
  {
    country: {
      name: "Inj. Novomix 50"
    }
  },
  {
    country: {
      name: "Inj. Novomix 50/50"
    }
  },
  {
    country: {
      name: "Novopen 4"
    }
  },
  {
    country: {
      name: "Inj. Novorapid"
    }
  },
  {
    country: {
      name: "Prolomet XL 12.5"
    }
  },
  {
    country: {
      name: "Inj. Ryzodeg"
    }
  },
  {
    country: {
      name: "Ryzodeg 30/70"
    }
  },
  {
    country: {
      name: "Ryzodeg 40"
    }
  },
  {
    country: {
      name: "Inj. Test I"
    }
  },
  {
    country: {
      name: "Toujeo"
    }
  },
  {
    country: {
      name: "Tredio"
    }
  },
  {
    country: {
      name: "Inj. Tresiba"
    }
  },
  {
    country: {
      name: "Inj. Trulicity"
    }
  },
  {
    country: {
      name: "Trulicity 1.5"
    }
  },
  {
    country: {
      name: "Inj. Victoza"
    }
  },
  {
    country: {
      name: "Inj. Wosulin 30/70"
    }
  },
  {
    country: {
      name: "Inj. Wosulin 50/50"
    }
  },
  {
    country: {
      name: "Xultophy"
    }
  },
  {
    country: {
      name: "medtronic"
    }
  },
  {
    country: {
      name: "Tab. Afoglip M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Semi Amaryl 0.5"
    }
  },
  {
    country: {
      name: "Tab. Glador M3 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glimy M"
    }
  },
  {
    country: {
      name: "Tab. Glipon MF"
    }
  },
  {
    country: {
      name: "Tab. Glitaris 15"
    }
  },
  {
    country: {
      name: "Tab. K Glim m 1mg"
    }
  },
  {
    country: {
      name: "Tab. Motvyst"
    }
  },
  {
    country: {
      name: "Tab. Pioglitazone 15"
    }
  },
  {
    country: {
      name: "Tab. Sexagliptin 5"
    }
  },
  {
    country: {
      name: "Tab. Sitagliptin 100 mg"
    }
  },
  {
    country: {
      name: "Tab. Triexer 3"
    }
  },
  {
    country: {
      name: "Tab. Trivolib 2"
    }
  },
  {
    country: {
      name: "Tab. Vedapride M2"
    }
  },
  {
    country: {
      name: "Tab. Voglitor MD 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglyson"
    }
  },
  {
    country: {
      name: "Tab. Zilenta 20 mg"
    }
  },
  {
    country: {
      name: "Tab. Acarbose IP"
    }
  },
  {
    country: {
      name: "Tab. Actiglipt M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Advog 0.2"
    }
  },
  {
    country: {
      name: "Tab. Advog 0.3"
    }
  },
  {
    country: {
      name: "Tab. Afoglip 20"
    }
  },
  {
    country: {
      name: "Tab. Ajaduo 25/5"
    }
  },
  {
    country: {
      name: "Tab. Ajaduo 5/10"
    }
  },
  {
    country: {
      name: "Tab. Alfabose 0.2"
    }
  },
  {
    country: {
      name: "Tab. Alfabose 0.3"
    }
  },
  {
    country: {
      name: "Tab. Amanza M 3"
    }
  },
  {
    country: {
      name: "Tab. Amaryl"
    }
  },
  {
    country: {
      name: "Tab. Amaryl 1"
    }
  },
  {
    country: {
      name: "Tab. Amaryl 2"
    }
  },
  {
    country: {
      name: "Tab. Amaryl 3"
    }
  },
  {
    country: {
      name: "Tab. Amaryl M 0.5"
    }
  },
  {
    country: {
      name: "Tab. Amaryl M 1"
    }
  },
  {
    country: {
      name: "Tab. Amaryl M1"
    }
  },
  {
    country: {
      name: "Tab. Amaryl M1 Forte"
    }
  },
  {
    country: {
      name: "Tab. Amaryl M2"
    }
  },
  {
    country: {
      name: "Tab. Amaryl M2 forte"
    }
  },
  {
    country: {
      name: "Tab. Amaryl MP2"
    }
  },
  {
    country: {
      name: "Tab. Amaryl MV 1"
    }
  },
  {
    country: {
      name: "Tab. Amaryl MV2"
    }
  },
  {
    country: {
      name: "Tab. Ameto GP1"
    }
  },
  {
    country: {
      name: "Tab. Ameto GP2"
    }
  },
  {
    country: {
      name: "Tab. Amaryl 1"
    }
  },
  {
    country: {
      name: "Tab. Amaryl 2"
    }
  },
  {
    country: {
      name: "Tab. Amaryl 3"
    }
  },
  {
    country: {
      name: "Tab. Amaryl M 1"
    }
  },
  {
    country: {
      name: "Tab. Apraglym M1"
    }
  },
  {
    country: {
      name: "Tab. Apriglim 1"
    }
  },
  {
    country: {
      name: "Tab. Apriglim M1"
    }
  },
  {
    country: {
      name: "Tab. Apriglim M2"
    }
  },
  {
    country: {
      name: "Tab. Apriglim MV 1"
    }
  },
  {
    country: {
      name: "Tab. Astromet 5 0.5"
    }
  },
  {
    country: {
      name: "Tab. Azneten"
    }
  },
  {
    country: {
      name: "Tab. Azneten m"
    }
  },
  {
    country: {
      name: "Tab. Azucon M"
    }
  },
  {
    country: {
      name: "Tab. Azukon M 80+500"
    }
  },
  {
    country: {
      name: "Tab. Azulix 1"
    }
  },
  {
    country: {
      name: "Tab. Azulix 1 MF Forte"
    }
  },
  {
    country: {
      name: "Tab. Azulix 1MF forte"
    }
  },
  {
    country: {
      name: "Tab. Azulix 2"
    }
  },
  {
    country: {
      name: "Tab. Azulix 2MF"
    }
  },
  {
    country: {
      name: "Tab. Azulix 2MF Forte"
    }
  },
  {
    country: {
      name: "Tab. Azulix 3"
    }
  },
  {
    country: {
      name: "Tab. Azulix 3 Mf"
    }
  },
  {
    country: {
      name: "Tab. Azulix 4"
    }
  },
  {
    country: {
      name: "Tab. Azulix 4 Mf Forte"
    }
  },
  {
    country: {
      name: "Tab. Azulix 4 mg"
    }
  },
  {
    country: {
      name: "Tab. Azulix MV 2/0.2"
    }
  },
  {
    country: {
      name: "Tab. Azulix Mf Forte"
    }
  },
  {
    country: {
      name: "Tab. Azulix Mf2"
    }
  },
  {
    country: {
      name: "Tab. Azulix Mr 2"
    }
  },
  {
    country: {
      name: "Tab. Azulix m 4"
    }
  },
  {
    country: {
      name: "Tab. Azulix mf 1"
    }
  },
  {
    country: {
      name: "Tab. BGR 34"
    }
  },
  {
    country: {
      name: "Tab. Barley grass pill"
    }
  },
  {
    country: {
      name: "Tab. Berberine"
    }
  },
  {
    country: {
      name: "Tab. Berbeshine"
    }
  },
  {
    country: {
      name: "Tab. Betaglim 1"
    }
  },
  {
    country: {
      name: "Tab. Betaglim 2"
    }
  },
  {
    country: {
      name: "Tab. Betaglim 3"
    }
  },
  {
    country: {
      name: "Tab. Betaglim M1"
    }
  },
  {
    country: {
      name: "Tab. Bigomet 500"
    }
  },
  {
    country: {
      name: "Tab. Bigomet Sr 1000"
    }
  },
  {
    country: {
      name: "Tab. Bigomet sr 500"
    }
  },
  {
    country: {
      name: "Tab. Biodib 15"
    }
  },
  {
    country: {
      name: "Tab. Biodib M 15"
    }
  },
  {
    country: {
      name: "Tab. Blisto 2 Mf"
    }
  },
  {
    country: {
      name: "Tab. Blisto 2 Mf"
    }
  },
  {
    country: {
      name: "Tab. Blisto 4 mf"
    }
  },
  {
    country: {
      name: "Tab. Blisto MF 1 SR"
    }
  },
  {
    country: {
      name: "Tab. Byetta 5"
    }
  },
  {
    country: {
      name: "Tab. CV Met 500"
    }
  },
  {
    country: {
      name: "Tab. CV Met Forte"
    }
  },
  {
    country: {
      name: "Tab. CYBLEX MV 40.2"
    }
  },
  {
    country: {
      name: "Tab. Canagliflozin 100"
    }
  },
  {
    country: {
      name: "Tab. Canagliflozin 300"
    }
  },
  {
    country: {
      name: "Tab. Carbophage Forte"
    }
  },
  {
    country: {
      name: "Tab. Carbophage G1"
    }
  },
  {
    country: {
      name: "Tab. Carbophage G2"
    }
  },
  {
    country: {
      name: "Tab. Carbophage SR 1"
    }
  },
  {
    country: {
      name: "Tab. Carbophage SR 1 gm"
    }
  },
  {
    country: {
      name: "Tab. Carbophage SR 500 mg"
    }
  },
  {
    country: {
      name: "Tab. Carbophage XR 1000"
    }
  },
  {
    country: {
      name: "Tab. Carbophage XR 500"
    }
  },
  {
    country: {
      name: "Tab. Carryl M 60 forte 60/1000"
    }
  },
  {
    country: {
      name: "Tab. Cetapin"
    }
  },
  {
    country: {
      name: "Tab. Cetapin 1000"
    }
  },
  {
    country: {
      name: "Tab. Cetapin 500"
    }
  },
  {
    country: {
      name: "Tab. Cetapin P 15"
    }
  },
  {
    country: {
      name: "Tab. Cetapin V 0.2"
    }
  },
  {
    country: {
      name: "Tab. Cetapin V 0.3"
    }
  },
  {
    country: {
      name: "Tab. Cetapin XR 1"
    }
  },
  {
    country: {
      name: "Tab. Cetapin XR 1000"
    }
  },
  {
    country: {
      name: "Tab. Cetapin XR 500"
    }
  },
  {
    country: {
      name: "Tab. Cgcron 80"
    }
  },
  {
    country: {
      name: "Tab. Citapin XR"
    }
  },
  {
    country: {
      name: "Tab. Cureformin 500"
    }
  },
  {
    country: {
      name: "Tab. Cyblex 40"
    }
  },
  {
    country: {
      name: "Tab. Cyblex 80"
    }
  },
  {
    country: {
      name: "Tab. Cyblex M 30 XR"
    }
  },
  {
    country: {
      name: "Tab. Cyblex M 40"
    }
  },
  {
    country: {
      name: "Tab. Cyblex M 60 XR"
    }
  },
  {
    country: {
      name: "Tab. Cyblex M 80"
    }
  },
  {
    country: {
      name: "Tab. Cyblex M SR"
    }
  },
  {
    country: {
      name: "Tab. Cyblex M forte 40"
    }
  },
  {
    country: {
      name: "Tab. Cyblex MV 40.3"
    }
  },
  {
    country: {
      name: "Tab. Cyblex MV 80.2"
    }
  },
  {
    country: {
      name: "Tab. Cyblex MV80.3"
    }
  },
  {
    country: {
      name: "Tab. Cyblex Mv 60+500+0.3"
    }
  },
  {
    country: {
      name: "Tab. Cyblex XR 30"
    }
  },
  {
    country: {
      name: "Tab. Cyblex XR 60"
    }
  },
  {
    country: {
      name: "Tab. Daonil"
    }
  },
  {
    country: {
      name: "Tab. Daonil 2.5"
    }
  },
  {
    country: {
      name: "Tab. Daonil 5"
    }
  },
  {
    country: {
      name: "Tab. Daonil M"
    }
  },
  {
    country: {
      name: "Tab. Dapagliflozin 10"
    }
  },
  {
    country: {
      name: "Tab. Dapagliflozin mf 1000 xr"
    }
  },
  {
    country: {
      name: "Tab. Dayclazide M 40"
    }
  },
  {
    country: {
      name: "Tab. Dayclazide M40"
    }
  },
  {
    country: {
      name: "Tab. Dayclazide M80"
    }
  },
  {
    country: {
      name: "Tab. Dayclazide MP"
    }
  },
  {
    country: {
      name: "Tab. Debifall"
    }
  },
  {
    country: {
      name: "Tab. Diabeclaz 60"
    }
  },
  {
    country: {
      name: "Tab. Diabecon Ds"
    }
  },
  {
    country: {
      name: "Tab. Diabend 80"
    }
  },
  {
    country: {
      name: "Tab. Diabend M"
    }
  },
  {
    country: {
      name: "Tab. Diabend M 80+500"
    }
  },
  {
    country: {
      name: "Tab. Diabeta 1000 SR"
    }
  },
  {
    country: {
      name: "Tab. Diabeta 500/5"
    }
  },
  {
    country: {
      name: "Tab. Diabeta SR 500"
    }
  },
  {
    country: {
      name: "Tab. Diabeton"
    }
  },
  {
    country: {
      name: "Tab. Diabetor"
    }
  },
  {
    country: {
      name: "Tab. Diabetrol 5/500"
    }
  },
  {
    country: {
      name: "Tab. Diabtetrol 250mg"
    }
  },
  {
    country: {
      name: "Tab. Dialon 1"
    }
  },
  {
    country: {
      name: "Tab. Diamet"
    }
  },
  {
    country: {
      name: "Tab. Diamicron"
    }
  },
  {
    country: {
      name: "Tab. Diamicron 40"
    }
  },
  {
    country: {
      name: "Tab. Diamicron 60"
    }
  },
  {
    country: {
      name: "Tab. Diamicron 60 SR"
    }
  },
  {
    country: {
      name: "Tab. Diamicron 60/500"
    }
  },
  {
    country: {
      name: "Tab. Diamicron 80"
    }
  },
  {
    country: {
      name: "Tab. Diamicron MR"
    }
  },
  {
    country: {
      name: "Tab. Diamicron MR 30"
    }
  },
  {
    country: {
      name: "Tab. Diamicron MR 60"
    }
  },
  {
    country: {
      name: "Tab. Diamicron MR30"
    }
  },
  {
    country: {
      name: "Tab. Diamicron XR 60"
    }
  },
  {
    country: {
      name: "Tab. Diamicron XR MET 50/500"
    }
  },
  {
    country: {
      name: "Tab. Diamicron XR MEX 60/500"
    }
  },
  {
    country: {
      name: "Tab. Diamicron XR Mex 500"
    }
  },
  {
    country: {
      name: "Tab. Diamicron XR mex 1"
    }
  },
  {
    country: {
      name: "Tab. Diamicron Xr30"
    }
  },
  {
    country: {
      name: "Tab. Diamicron Xr90"
    }
  },
  {
    country: {
      name: "Tab. Diamicron xr"
    }
  },
  {
    country: {
      name: "Tab. Dianorm"
    }
  },
  {
    country: {
      name: "Tab. Dianorm 40"
    }
  },
  {
    country: {
      name: "Tab. Dianorm 60"
    }
  },
  {
    country: {
      name: "Tab. Dianorm 80"
    }
  },
  {
    country: {
      name: "Tab. Dianorm M"
    }
  },
  {
    country: {
      name: "Tab. Dianorm M 500"
    }
  },
  {
    country: {
      name: "Tab. Dianorm M OD"
    }
  },
  {
    country: {
      name: "Tab. Dianorm M OD 1000"
    }
  },
  {
    country: {
      name: "Tab. Dianorm Od 30"
    }
  },
  {
    country: {
      name: "Tab. Dianorm-OD 60"
    }
  },
  {
    country: {
      name: "Tab. Diaperide 1"
    }
  },
  {
    country: {
      name: "Tab. Diapride 2"
    }
  },
  {
    country: {
      name: "Tab. Diapride M1 Forte"
    }
  },
  {
    country: {
      name: "Tab. Diapride M1 Forte SR"
    }
  },
  {
    country: {
      name: "Tab. Diapride M2"
    }
  },
  {
    country: {
      name: "Tab. Diapride M2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Diapride M3 forte"
    }
  },
  {
    country: {
      name: "Tab. Diataal D"
    }
  },
  {
    country: {
      name: "Tab. Diatol"
    }
  },
  {
    country: {
      name: "Tab. Dibeta sr 1000"
    }
  },
  {
    country: {
      name: "Tab. Dibizide"
    }
  },
  {
    country: {
      name: "Tab. Dibizide M"
    }
  },
  {
    country: {
      name: "Tab. Dizid 80"
    }
  },
  {
    country: {
      name: "Tab. Dortmet G2"
    }
  },
  {
    country: {
      name: "Tab. EcoglipT"
    }
  },
  {
    country: {
      name: "Tab. Eglucent mix 25"
    }
  },
  {
    country: {
      name: "Tab. Eglucent mix 50"
    }
  },
  {
    country: {
      name: "Tab. Eliptin 20"
    }
  },
  {
    country: {
      name: "Tab. Eliptin M"
    }
  },
  {
    country: {
      name: "Tab. Eliptin M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Eliptin M Forte"
    }
  },
  {
    country: {
      name: "Tab. Empagliflozin 10mg"
    }
  },
  {
    country: {
      name: "Tab. Empagliflozin 25"
    }
  },
  {
    country: {
      name: "Tab. Endoformin 500 mg"
    }
  },
  {
    country: {
      name: "Tab. Endoformin G1"
    }
  },
  {
    country: {
      name: "Tab. Endoformin Pg 2"
    }
  },
  {
    country: {
      name: "Tab. Endoformin SR 1000"
    }
  },
  {
    country: {
      name: "Tab. Endoformin SR 501"
    }
  },
  {
    country: {
      name: "Tab. Endoformin sr 500"
    }
  },
  {
    country: {
      name: "Tab. Endoformine Pg 2"
    }
  },
  {
    country: {
      name: "Tab. Endoformine Pg 2"
    }
  },
  {
    country: {
      name: "Tab. Eternex M"
    }
  },
  {
    country: {
      name: "Tab. Eternex T 20"
    }
  },
  {
    country: {
      name: "Tab. Euclide 40"
    }
  },
  {
    country: {
      name: "Tab. Euclide M"
    }
  },
  {
    country: {
      name: "Tab. Euclide M 30"
    }
  },
  {
    country: {
      name: "Tab. Euclide m 80/500"
    }
  },
  {
    country: {
      name: "Tab. Euglim 1"
    }
  },
  {
    country: {
      name: "Tab. Euglim 2"
    }
  },
  {
    country: {
      name: "Tab. Euglim M1"
    }
  },
  {
    country: {
      name: "Tab. Euglim M2"
    }
  },
  {
    country: {
      name: "Tab. Euglucon 5"
    }
  },
  {
    country: {
      name: "Tab. Eurepa 0.5"
    }
  },
  {
    country: {
      name: "Tab. Eurepa 1"
    }
  },
  {
    country: {
      name: "Tab. Eurepa 1 MF"
    }
  },
  {
    country: {
      name: "Tab. Eurepa 2"
    }
  },
  {
    country: {
      name: "Tab. Eurepa MF 1"
    }
  },
  {
    country: {
      name: "Tab. Eurepa MF2"
    }
  },
  {
    country: {
      name: "Tab. Exermet 1 gm"
    }
  },
  {
    country: {
      name: "Tab. Exermet 1000"
    }
  },
  {
    country: {
      name: "Tab. Exermet 500"
    }
  },
  {
    country: {
      name: "Tab. Exermet GM 501"
    }
  },
  {
    country: {
      name: "Tab. Exermet GM 502"
    }
  },
  {
    country: {
      name: "Tab. Exermet Gm Forte 2"
    }
  },
  {
    country: {
      name: "Tab. Exermet SR 500"
    }
  },
  {
    country: {
      name: "Tab. Flexiglim 0.5"
    }
  },
  {
    country: {
      name: "Tab. Formin 500"
    }
  },
  {
    country: {
      name: "Tab. Formin PG 2"
    }
  },
  {
    country: {
      name: "Tab. Formin Plus"
    }
  },
  {
    country: {
      name: "Tab. Formin Plus 500 Mg"
    }
  },
  {
    country: {
      name: "Tab. Formin SR 1000"
    }
  },
  {
    country: {
      name: "Tab. Formin SR 500"
    }
  },
  {
    country: {
      name: "Tab. Formin plus 500"
    }
  },
  {
    country: {
      name: "Tab. Forminal 500"
    }
  },
  {
    country: {
      name: "Tab. Forminal SR 1000"
    }
  },
  {
    country: {
      name: "Tab. Forminal SR 500"
    }
  },
  {
    country: {
      name: "Tab. Formit 500"
    }
  },
  {
    country: {
      name: "Tab. Forson pg 1"
    }
  },
  {
    country: {
      name: "Tab. Forson sr 1000"
    }
  },
  {
    country: {
      name: "Tab. Forxiga 10"
    }
  },
  {
    country: {
      name: "Tab. Forxiga 5"
    }
  },
  {
    country: {
      name: "Tab. Foxiga 10mg"
    }
  },
  {
    country: {
      name: "Tab. G - Reg SR 1000"
    }
  },
  {
    country: {
      name: "Tab. G - Reg SR 500"
    }
  },
  {
    country: {
      name: "Tab. G-met 1"
    }
  },
  {
    country: {
      name: "Tab. G-met 500"
    }
  },
  {
    country: {
      name: "Tab. G-met SR 500"
    }
  },
  {
    country: {
      name: "Tab. GLI M"
    }
  },
  {
    country: {
      name: "Tab. GLZ 80"
    }
  },
  {
    country: {
      name: "Tab. GLZ Plus"
    }
  },
  {
    country: {
      name: "Tab. GLZ Plus 80/500"
    }
  },
  {
    country: {
      name: "Tab. GLZ XR60"
    }
  },
  {
    country: {
      name: "Tab. GLZ toal"
    }
  },
  {
    country: {
      name: "Tab. GM2"
    }
  },
  {
    country: {
      name: "Tab. GMP-2"
    }
  },
  {
    country: {
      name: "Tab. GP 0.5"
    }
  },
  {
    country: {
      name: "Tab. GP 1"
    }
  },
  {
    country: {
      name: "Tab. GP1"
    }
  },
  {
    country: {
      name: "Tab. GP2"
    }
  },
  {
    country: {
      name: "Tab. GP3"
    }
  },
  {
    country: {
      name: "Tab. Galvasmet 50/850"
    }
  },
  {
    country: {
      name: "Tab. Galvus 50"
    }
  },
  {
    country: {
      name: "Tab. Galvus Met 50/1000"
    }
  },
  {
    country: {
      name: "Tab. Galvus Met 50/500"
    }
  },
  {
    country: {
      name: "Tab. Galvus Met 50/850"
    }
  },
  {
    country: {
      name: "Tab. Galvus Met 500"
    }
  },
  {
    country: {
      name: "Tab. Gemer 0.5"
    }
  },
  {
    country: {
      name: "Tab. Gemer 1"
    }
  },
  {
    country: {
      name: "Tab. Gemer 2"
    }
  },
  {
    country: {
      name: "Tab. Gemer 2 Ds"
    }
  },
  {
    country: {
      name: "Tab. Gemer 3 SR tab"
    }
  },
  {
    country: {
      name: "Tab. Gemer DS 1"
    }
  },
  {
    country: {
      name: "Tab. Gemer DS 2"
    }
  },
  {
    country: {
      name: "Tab. Gemer DS 3"
    }
  },
  {
    country: {
      name: "Tab. Gemer DS 4"
    }
  },
  {
    country: {
      name: "Tab. Gemer DS-1"
    }
  },
  {
    country: {
      name: "Tab. Gemer Forte"
    }
  },
  {
    country: {
      name: "Tab. Gemer Forte 1"
    }
  },
  {
    country: {
      name: "Tab. Gemer Forte 2"
    }
  },
  {
    country: {
      name: "Tab. Gemer Forte 3"
    }
  },
  {
    country: {
      name: "Tab. Gemer M2"
    }
  },
  {
    country: {
      name: "Tab. Gemer P 1"
    }
  },
  {
    country: {
      name: "Tab. Gemer P2"
    }
  },
  {
    country: {
      name: "Tab. Geminor 1"
    }
  },
  {
    country: {
      name: "Tab. Geminor 2"
    }
  },
  {
    country: {
      name: "Tab. Geminor M 3"
    }
  },
  {
    country: {
      name: "Tab. Geminor M 4 Forte"
    }
  },
  {
    country: {
      name: "Tab. Geminor M1"
    }
  },
  {
    country: {
      name: "Tab. Geminor M1 Forte"
    }
  },
  {
    country: {
      name: "Tab. Geminor M2"
    }
  },
  {
    country: {
      name: "Tab. Geminor M2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Geminor MP 1"
    }
  },
  {
    country: {
      name: "Tab. Geminor MP 2"
    }
  },
  {
    country: {
      name: "Tab. Geminor mp2"
    }
  },
  {
    country: {
      name: "Tab. Gepride 1"
    }
  },
  {
    country: {
      name: "Tab. Gepride 2"
    }
  },
  {
    country: {
      name: "Tab. Gepride 3"
    }
  },
  {
    country: {
      name: "Tab. Gepride M 0.5"
    }
  },
  {
    country: {
      name: "Tab. Gepride M 1 Forte"
    }
  },
  {
    country: {
      name: "Tab. Gepride M 2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Gepride M 3"
    }
  },
  {
    country: {
      name: "Tab. Gepride M 3 Forte"
    }
  },
  {
    country: {
      name: "Tab. Gepride M 4 Forte"
    }
  },
  {
    country: {
      name: "Tab. Gepride M1"
    }
  },
  {
    country: {
      name: "Tab. Gepride M2"
    }
  },
  {
    country: {
      name: "Tab. Gepride M3"
    }
  },
  {
    country: {
      name: "Tab. Gibtulio"
    }
  },
  {
    country: {
      name: "Tab. Gibtulio 10"
    }
  },
  {
    country: {
      name: "Tab. Gibtulio 25"
    }
  },
  {
    country: {
      name: "Tab. Gibtulio 25mg"
    }
  },
  {
    country: {
      name: "Tab. Gibtulio met"
    }
  },
  {
    country: {
      name: "Tab. Gimisave 1mg"
    }
  },
  {
    country: {
      name: "Tab. Glador 1"
    }
  },
  {
    country: {
      name: "Tab. Glador 2"
    }
  },
  {
    country: {
      name: "Tab. Glador 3"
    }
  },
  {
    country: {
      name: "Tab. Glador 4"
    }
  },
  {
    country: {
      name: "Tab. Glador M 1 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glador M 2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glador M 3 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glador M 4 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glador M1"
    }
  },
  {
    country: {
      name: "Tab. Glador M2"
    }
  },
  {
    country: {
      name: "Tab. Glaritus"
    }
  },
  {
    country: {
      name: "Tab. Glavus 50"
    }
  },
  {
    country: {
      name: "Tab. Glazid M"
    }
  },
  {
    country: {
      name: "Tab. Glazid M 80+500"
    }
  },
  {
    country: {
      name: "Tab. Glenmark"
    }
  },
  {
    country: {
      name: "Tab. Gli 40"
    }
  },
  {
    country: {
      name: "Tab. Gli 80"
    }
  },
  {
    country: {
      name: "Tab. Gli M 1"
    }
  },
  {
    country: {
      name: "Tab. Gli M1"
    }
  },
  {
    country: {
      name: "Tab. Gliaris 15"
    }
  },
  {
    country: {
      name: "Tab. Gliaris 30"
    }
  },
  {
    country: {
      name: "Tab. Gliaris M 15"
    }
  },
  {
    country: {
      name: "Tab. Glibenclamide 5"
    }
  },
  {
    country: {
      name: "Tab. Gliclapack 30"
    }
  },
  {
    country: {
      name: "Tab. Gliclazide 120 mg"
    }
  },
  {
    country: {
      name: "Tab. Gliclazide 40"
    }
  },
  {
    country: {
      name: "Tab. Gliclazide 60mg"
    }
  },
  {
    country: {
      name: "Tab. Gliclazide 80"
    }
  },
  {
    country: {
      name: "Tab. Glide 5"
    }
  },
  {
    country: {
      name: "Tab. Glim M1"
    }
  },
  {
    country: {
      name: "Tab. Glimac M2"
    }
  },
  {
    country: {
      name: "Tab. Glimaday 1"
    }
  },
  {
    country: {
      name: "Tab. Glimaday 2"
    }
  },
  {
    country: {
      name: "Tab. Glimaday Forte"
    }
  },
  {
    country: {
      name: "Tab. Glimaday Forte 1"
    }
  },
  {
    country: {
      name: "Tab. Glimaday Forte 2"
    }
  },
  {
    country: {
      name: "Tab. Glimaday Forte 3"
    }
  },
  {
    country: {
      name: "Tab. Glimaday HS"
    }
  },
  {
    country: {
      name: "Tab. Glimaday P 1"
    }
  },
  {
    country: {
      name: "Tab. Glimaday P 2"
    }
  },
  {
    country: {
      name: "Tab. Glimcip"
    }
  },
  {
    country: {
      name: "Tab. Glimcip 1"
    }
  },
  {
    country: {
      name: "Tab. Glimcip 2"
    }
  },
  {
    country: {
      name: "Tab. Glimcip 3"
    }
  },
  {
    country: {
      name: "Tab. Glimcip 4"
    }
  },
  {
    country: {
      name: "Tab. Glimda"
    }
  },
  {
    country: {
      name: "Tab. Glimda 1"
    }
  },
  {
    country: {
      name: "Tab. Glimda 2"
    }
  },
  {
    country: {
      name: "Tab. Glimda MV 1"
    }
  },
  {
    country: {
      name: "Tab. Glimda MV 2"
    }
  },
  {
    country: {
      name: "Tab. Glimed Mf2 1000 Sr"
    }
  },
  {
    country: {
      name: "Tab. Glimeperide"
    }
  },
  {
    country: {
      name: "Tab. Glimeperide 1"
    }
  },
  {
    country: {
      name: "Tab. Glimeperide 2"
    }
  },
  {
    country: {
      name: "Tab. Glimeperide 4"
    }
  },
  {
    country: {
      name: "Tab. Glimepiride 0.5"
    }
  },
  {
    country: {
      name: "Tab. Glimepiride 1"
    }
  },
  {
    country: {
      name: "Tab. Glimepiride 2"
    }
  },
  {
    country: {
      name: "Tab. Glimepiride 3"
    }
  },
  {
    country: {
      name: "Tab. Glimepiride sandoz"
    }
  },
  {
    country: {
      name: "Tab. Glimer 2 mg"
    }
  },
  {
    country: {
      name: "Tab. Glimer 3"
    }
  },
  {
    country: {
      name: "Tab. Glimer1"
    }
  },
  {
    country: {
      name: "Tab. Glimestar 1"
    }
  },
  {
    country: {
      name: "Tab. Glimestar 2"
    }
  },
  {
    country: {
      name: "Tab. Glimestar 3"
    }
  },
  {
    country: {
      name: "Tab. Glimestar 4"
    }
  },
  {
    country: {
      name: "Tab. Glimestar M 2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glimestar M 3 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glimestar M 4 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glimestar M1"
    }
  },
  {
    country: {
      name: "Tab. Glimestar M1 forte"
    }
  },
  {
    country: {
      name: "Tab. Glimestar M2"
    }
  },
  {
    country: {
      name: "Tab. Glimestar M4"
    }
  },
  {
    country: {
      name: "Tab. Glimestar PM 4"
    }
  },
  {
    country: {
      name: "Tab. Glimestar PM2"
    }
  },
  {
    country: {
      name: "Tab. Glimester 4"
    }
  },
  {
    country: {
      name: "Tab. Glimester M 3"
    }
  },
  {
    country: {
      name: "Tab. Glimester PM 2"
    }
  },
  {
    country: {
      name: "Tab. GlimesterPm 1"
    }
  },
  {
    country: {
      name: "Tab. Glimet 250"
    }
  },
  {
    country: {
      name: "Tab. Glimet 250/2.5"
    }
  },
  {
    country: {
      name: "Tab. Glimet 500/5"
    }
  },
  {
    country: {
      name: "Tab. Glimet M 1"
    }
  },
  {
    country: {
      name: "Tab. Glimfirst 1"
    }
  },
  {
    country: {
      name: "Tab. Glimfirst 2"
    }
  },
  {
    country: {
      name: "Tab. Glimfirst 4"
    }
  },
  {
    country: {
      name: "Tab. Glimfirst M 3"
    }
  },
  {
    country: {
      name: "Tab. Glimfirst M1"
    }
  },
  {
    country: {
      name: "Tab. Glimfirst M2"
    }
  },
  {
    country: {
      name: "Tab. Glimfirst M2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glimfirst MP 1"
    }
  },
  {
    country: {
      name: "Tab. Glimfirst MP 2"
    }
  },
  {
    country: {
      name: "Tab. Glimfirst MV1"
    }
  },
  {
    country: {
      name: "Tab. Glimfirst MV2"
    }
  },
  {
    country: {
      name: "Tab. Glimgold MF 2"
    }
  },
  {
    country: {
      name: "Tab. Glimgold MF1"
    }
  },
  {
    country: {
      name: "Tab. Glimi"
    }
  },
  {
    country: {
      name: "Tab. Glimi 0.5"
    }
  },
  {
    country: {
      name: "Tab. Glimi 1"
    }
  },
  {
    country: {
      name: "Tab. Glimi 2"
    }
  },
  {
    country: {
      name: "Tab. Glimi 3"
    }
  },
  {
    country: {
      name: "Tab. Glimi M"
    }
  },
  {
    country: {
      name: "Tab. Glimi M 3"
    }
  },
  {
    country: {
      name: "Tab. Glimi M1"
    }
  },
  {
    country: {
      name: "Tab. Glimi M2"
    }
  },
  {
    country: {
      name: "Tab. Glimicure M 0.5/500"
    }
  },
  {
    country: {
      name: "Tab. Glimicure M2"
    }
  },
  {
    country: {
      name: "Tab. Glimidib M 2 SR"
    }
  },
  {
    country: {
      name: "Tab. Glimidib M1 SR"
    }
  },
  {
    country: {
      name: "Tab. Glimigold MF 1"
    }
  },
  {
    country: {
      name: "Tab. Glimin M1"
    }
  },
  {
    country: {
      name: "Tab. Glimiperide 1"
    }
  },
  {
    country: {
      name: "Tab. Glimiperide 2"
    }
  },
  {
    country: {
      name: "Tab. Glimiprex 1"
    }
  },
  {
    country: {
      name: "Tab. Glimiprex 2"
    }
  },
  {
    country: {
      name: "Tab. Glimiprex 3"
    }
  },
  {
    country: {
      name: "Tab. Glimiprex 4"
    }
  },
  {
    country: {
      name: "Tab. Glimiprex 500"
    }
  },
  {
    country: {
      name: "Tab. Glimiprex MF 1/1000"
    }
  },
  {
    country: {
      name: "Tab. Glimiprex MF 1/500"
    }
  },
  {
    country: {
      name: "Tab. Glimiprex MF 2"
    }
  },
  {
    country: {
      name: "Tab. Glimiprex MF 2/1000"
    }
  },
  {
    country: {
      name: "Tab. Glimiprex MF 2/500"
    }
  },
  {
    country: {
      name: "Tab. Glimiprex MF Forte 1/1000"
    }
  },
  {
    country: {
      name: "Tab. Glimiprex MF Forte 2/1000"
    }
  },
  {
    country: {
      name: "Tab. Glimiprime M1"
    }
  },
  {
    country: {
      name: "Tab. Glimisave 1"
    }
  },
  {
    country: {
      name: "Tab. Glimisave 1mg"
    }
  },
  {
    country: {
      name: "Tab. Glimisave 2"
    }
  },
  {
    country: {
      name: "Tab. Glimisave 3"
    }
  },
  {
    country: {
      name: "Tab. Glimisave 4"
    }
  },
  {
    country: {
      name: "Tab. Glimisave M 0.5"
    }
  },
  {
    country: {
      name: "Tab. Glimisave M 1"
    }
  },
  {
    country: {
      name: "Tab. Glimisave M 1 850"
    }
  },
  {
    country: {
      name: "Tab. Glimisave M 2"
    }
  },
  {
    country: {
      name: "Tab. Glimisave M 2 750"
    }
  },
  {
    country: {
      name: "Tab. Glimisave M 2 850"
    }
  },
  {
    country: {
      name: "Tab. Glimisave M 3"
    }
  },
  {
    country: {
      name: "Tab. Glimisave M 3 850"
    }
  },
  {
    country: {
      name: "Tab. Glimisave M 4 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glimisave M 851"
    }
  },
  {
    country: {
      name: "Tab. Glimisave M 852"
    }
  },
  {
    country: {
      name: "Tab. Glimisave M 853"
    }
  },
  {
    country: {
      name: "Tab. Glimisave M1"
    }
  },
  {
    country: {
      name: "Tab. Glimisave M1 CP 305"
    }
  },
  {
    country: {
      name: "Tab. Glimisave M1 forte"
    }
  },
  {
    country: {
      name: "Tab. Glimisave M2"
    }
  },
  {
    country: {
      name: "Tab. Glimisave M2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glimisave M3 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glimisave MV 1"
    }
  },
  {
    country: {
      name: "Tab. Glimisave MV 1.3"
    }
  },
  {
    country: {
      name: "Tab. Glimisave MV 2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glimisave MV 2.3"
    }
  },
  {
    country: {
      name: "Tab. Glimisave MV 3.3"
    }
  },
  {
    country: {
      name: "Tab. Glimisave MV3"
    }
  },
  {
    country: {
      name: "Tab. Glimisave Max 3"
    }
  },
  {
    country: {
      name: "Tab. Glimisave Max V Forte 1"
    }
  },
  {
    country: {
      name: "Tab. Glimisave Max V Forte 2"
    }
  },
  {
    country: {
      name: "Tab. Glimisave Max1"
    }
  },
  {
    country: {
      name: "Tab. Glimisave m2"
    }
  },
  {
    country: {
      name: "Tab. Glimisave m3. 3"
    }
  },
  {
    country: {
      name: "Tab. Glimisave max2"
    }
  },
  {
    country: {
      name: "Tab. Glimisave mv 3.3"
    }
  },
  {
    country: {
      name: "Tab. Glimisave mv2"
    }
  },
  {
    country: {
      name: "Tab. Glimison M2"
    }
  },
  {
    country: {
      name: "Tab. Glimison m1"
    }
  },
  {
    country: {
      name: "Tab. Glimistar M1"
    }
  },
  {
    country: {
      name: "Tab. Glimistar M2"
    }
  },
  {
    country: {
      name: "Tab. Glimistar M3"
    }
  },
  {
    country: {
      name: "Tab. Glimistar M4"
    }
  },
  {
    country: {
      name: "Tab. Glimitab m1"
    }
  },
  {
    country: {
      name: "Tab. Glimith MF3 1000 SR"
    }
  },
  {
    country: {
      name: "Tab. Glimp M1"
    }
  },
  {
    country: {
      name: "Tab. Glimp M1 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glimp M2 SR"
    }
  },
  {
    country: {
      name: "Tab. Glimpid 1"
    }
  },
  {
    country: {
      name: "Tab. Glimpid 2 mg"
    }
  },
  {
    country: {
      name: "Tab. Glimpid 4"
    }
  },
  {
    country: {
      name: "Tab. Glimpid2"
    }
  },
  {
    country: {
      name: "Tab. Glimpil MF"
    }
  },
  {
    country: {
      name: "Tab. Glimpse"
    }
  },
  {
    country: {
      name: "Tab. Glimsave M3"
    }
  },
  {
    country: {
      name: "Tab. Glimser 2"
    }
  },
  {
    country: {
      name: "Tab. Glimstar M1"
    }
  },
  {
    country: {
      name: "Tab. Glimstar M2"
    }
  },
  {
    country: {
      name: "Tab. Glimsy M2"
    }
  },
  {
    country: {
      name: "Tab. Glimulin 2"
    }
  },
  {
    country: {
      name: "Tab. Glimulin 4 Mf Forte"
    }
  },
  {
    country: {
      name: "Tab. Glimulin MF 2"
    }
  },
  {
    country: {
      name: "Tab. Glimy"
    }
  },
  {
    country: {
      name: "Tab. Glimy 7.5"
    }
  },
  {
    country: {
      name: "Tab. Glimy 0.5"
    }
  },
  {
    country: {
      name: "Tab. Glimy 1"
    }
  },
  {
    country: {
      name: "Tab. Glimy 2"
    }
  },
  {
    country: {
      name: "Tab. Glimy 3"
    }
  },
  {
    country: {
      name: "Tab. Glimy 4"
    }
  },
  {
    country: {
      name: "Tab. Glimy M 3 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glimy M forte"
    }
  },
  {
    country: {
      name: "Tab. Glimy M1"
    }
  },
  {
    country: {
      name: "Tab. Glimy M2"
    }
  },
  {
    country: {
      name: "Tab. Glimy M2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glimy MP 1"
    }
  },
  {
    country: {
      name: "Tab. Glimy MP 2"
    }
  },
  {
    country: {
      name: "Tab. Glimy MV 1"
    }
  },
  {
    country: {
      name: "Tab. Glimy MV 2"
    }
  },
  {
    country: {
      name: "Tab. Glinate 120"
    }
  },
  {
    country: {
      name: "Tab. Glinda 2"
    }
  },
  {
    country: {
      name: "Tab. Glinil 5"
    }
  },
  {
    country: {
      name: "Tab. Glinil M"
    }
  },
  {
    country: {
      name: "Tab. Glinil M 5/500"
    }
  },
  {
    country: {
      name: "Tab. Glipijub M 20"
    }
  },
  {
    country: {
      name: "Tab. Glipijub M forte"
    }
  },
  {
    country: {
      name: "Tab. Glipijub m 20"
    }
  },
  {
    country: {
      name: "Tab. Glipizide"
    }
  },
  {
    country: {
      name: "Tab. Glipizide"
    }
  },
  {
    country: {
      name: "Tab. Glipizide 10"
    }
  },
  {
    country: {
      name: "Tab. Glipizide 2.5"
    }
  },
  {
    country: {
      name: "Tab. Glipizide 5"
    }
  },
  {
    country: {
      name: "Tab. Glipsov"
    }
  },
  {
    country: {
      name: "Tab. Gliptamet 50/1000"
    }
  },
  {
    country: {
      name: "Tab. Glipten"
    }
  },
  {
    country: {
      name: "Tab. Gliptin"
    }
  },
  {
    country: {
      name: "Tab. Glirum MF"
    }
  },
  {
    country: {
      name: "Tab. Glisen 1"
    }
  },
  {
    country: {
      name: "Tab. Glisen 2"
    }
  },
  {
    country: {
      name: "Tab. Glisen 3"
    }
  },
  {
    country: {
      name: "Tab. Glisen MF 1"
    }
  },
  {
    country: {
      name: "Tab. Glisen MF 2"
    }
  },
  {
    country: {
      name: "Tab. Glisen MF Forte 1"
    }
  },
  {
    country: {
      name: "Tab. Glisen MF Forte 2"
    }
  },
  {
    country: {
      name: "Tab. Glisen PM 1"
    }
  },
  {
    country: {
      name: "Tab. Glisen PM 2"
    }
  },
  {
    country: {
      name: "Tab. Glisen VM 1"
    }
  },
  {
    country: {
      name: "Tab. Glisen VM 1/0.3"
    }
  },
  {
    country: {
      name: "Tab. Glisen VM 2"
    }
  },
  {
    country: {
      name: "Tab. Glitaris 7.5"
    }
  },
  {
    country: {
      name: "Tab. Glitaris M 15"
    }
  },
  {
    country: {
      name: "Tab. Glitaris M 7.5 / 500"
    }
  },
  {
    country: {
      name: "Tab. Glitaris M 7.5 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glitz MF 80/500"
    }
  },
  {
    country: {
      name: "Tab. Glix 80"
    }
  },
  {
    country: {
      name: "Tab. Glix M"
    }
  },
  {
    country: {
      name: "Tab. Glix M 80"
    }
  },
  {
    country: {
      name: "Tab. Glix MR 30"
    }
  },
  {
    country: {
      name: "Tab. Glix MR 40"
    }
  },
  {
    country: {
      name: "Tab. Glix MR 60"
    }
  },
  {
    country: {
      name: "Tab. Gliz M"
    }
  },
  {
    country: {
      name: "Tab. Glizade 80"
    }
  },
  {
    country: {
      name: "Tab. Glizem 40"
    }
  },
  {
    country: {
      name: "Tab. Glizid 60"
    }
  },
  {
    country: {
      name: "Tab. Glizid 40"
    }
  },
  {
    country: {
      name: "Tab. Glizid 40/500"
    }
  },
  {
    country: {
      name: "Tab. Glizid 80"
    }
  },
  {
    country: {
      name: "Tab. Glizid M"
    }
  },
  {
    country: {
      name: "Tab. Glizid M 40"
    }
  },
  {
    country: {
      name: "Tab. Glizid M 80/500"
    }
  },
  {
    country: {
      name: "Tab. Glizid M OD 30"
    }
  },
  {
    country: {
      name: "Tab. Glizid M OD 60"
    }
  },
  {
    country: {
      name: "Tab. Glizid MR 30"
    }
  },
  {
    country: {
      name: "Tab. Glizid MR 60"
    }
  },
  {
    country: {
      name: "Tab. Glizid MV"
    }
  },
  {
    country: {
      name: "Tab. Glizid MV 80/500/0.3"
    }
  },
  {
    country: {
      name: "Tab. Glizid Total P 15"
    }
  },
  {
    country: {
      name: "Tab. Glizid Total P 7.5"
    }
  },
  {
    country: {
      name: "Tab. Glizid m 40/500"
    }
  },
  {
    country: {
      name: "Tab. Glizide 40"
    }
  },
  {
    country: {
      name: "Tab. Glizihenz 60"
    }
  },
  {
    country: {
      name: "Tab. Glizihenz M80"
    }
  },
  {
    country: {
      name: "Tab. Glizihenz m 80/500"
    }
  },
  {
    country: {
      name: "Tab. Glucar 25"
    }
  },
  {
    country: {
      name: "Tab. Glucar 50"
    }
  },
  {
    country: {
      name: "Tab. Gluco D 1.5/400"
    }
  },
  {
    country: {
      name: "Tab. Glucobay 25"
    }
  },
  {
    country: {
      name: "Tab. Glucobay 50"
    }
  },
  {
    country: {
      name: "Tab. Glucobay M 25"
    }
  },
  {
    country: {
      name: "Tab. Glucobay M 50"
    }
  },
  {
    country: {
      name: "Tab. Glucomust M"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm 500"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm G 0.5"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm G 0.5 Forte"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm G 3 Forte"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm G 4 (500/4)"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm G 4 Forte"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm G I D"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm G plus 1"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm G plus 2"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm G plus 3"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm G1"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm G1 forte"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm G2"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm G2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm G3"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm G3 fort"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm G4"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm GP 2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm M"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm M80"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm P 15"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm P 7.5"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm PG 1"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm PG1"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm PG1 forte"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm PG2"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm PGL"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm SR 500"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm SR 850"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm Sr 1000"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm V 0.2"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm V 0.3"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm VG 1"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm VG 1 Forte"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm VG 1 Plus"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm VG 2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm VG-2"
    }
  },
  {
    country: {
      name: "Tab. Gluconorm pg2"
    }
  },
  {
    country: {
      name: "Tab. Glucophage 500"
    }
  },
  {
    country: {
      name: "Tab. Glucophage 750"
    }
  },
  {
    country: {
      name: "Tab. Glucophage 850"
    }
  },
  {
    country: {
      name: "Tab. Glucophage SR"
    }
  },
  {
    country: {
      name: "Tab. Glucophage SR 500"
    }
  },
  {
    country: {
      name: "Tab. Glucophage XR"
    }
  },
  {
    country: {
      name: "Tab. Glucophage XR 1gm"
    }
  },
  {
    country: {
      name: "Tab. Glucored"
    }
  },
  {
    country: {
      name: "Tab. Glucored (2.5/400)"
    }
  },
  {
    country: {
      name: "Tab. Glucored 2.5/500"
    }
  },
  {
    country: {
      name: "Tab. Glucored 500"
    }
  },
  {
    country: {
      name: "Tab. Glucored Forte"
    }
  },
  {
    country: {
      name: "Tab. Glucored Forte (5/500)"
    }
  },
  {
    country: {
      name: "Tab. Glucored Forte 500"
    }
  },
  {
    country: {
      name: "Tab. Glucored Forte 850"
    }
  },
  {
    country: {
      name: "Tab. Glucored Forte SR"
    }
  },
  {
    country: {
      name: "Tab. Glucoryl"
    }
  },
  {
    country: {
      name: "Tab. Glucoryl M 0.5"
    }
  },
  {
    country: {
      name: "Tab. Glucoryl M 1 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glucoryl M 3"
    }
  },
  {
    country: {
      name: "Tab. Glucoryl M 3 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glucoryl M 4 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glucoryl M Forte 2"
    }
  },
  {
    country: {
      name: "Tab. Glucoryl M1"
    }
  },
  {
    country: {
      name: "Tab. Glucoryl M2"
    }
  },
  {
    country: {
      name: "Tab. Glucoryl MP 1"
    }
  },
  {
    country: {
      name: "Tab. Glucoryl MP 2"
    }
  },
  {
    country: {
      name: "Tab. Glucoryl MV 1"
    }
  },
  {
    country: {
      name: "Tab. Glucoryl MV 1/0.3"
    }
  },
  {
    country: {
      name: "Tab. Glucoryl MV 2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glucoryl MV 2/0.3"
    }
  },
  {
    country: {
      name: "Tab. Glucoryl mv 2"
    }
  },
  {
    country: {
      name: "Tab. Glucoryl-MV1"
    }
  },
  {
    country: {
      name: "Tab. Glucosamine 500"
    }
  },
  {
    country: {
      name: "Tab. Glucosamine HCL 1500"
    }
  },
  {
    country: {
      name: "Tab. Glucosamine chondroitin"
    }
  },
  {
    country: {
      name: "Tab. Glucosamine sulfate"
    }
  },
  {
    country: {
      name: "Tab. Glucose health Amway"
    }
  },
  {
    country: {
      name: "Tab. Glucosol -XR 60"
    }
  },
  {
    country: {
      name: "Tab. Glucotrol Mf"
    }
  },
  {
    country: {
      name: "Tab. Glucovance 250"
    }
  },
  {
    country: {
      name: "Tab. Glucovance 500/5"
    }
  },
  {
    country: {
      name: "Tab. Gluformin 0.5"
    }
  },
  {
    country: {
      name: "Tab. Gluformin 1"
    }
  },
  {
    country: {
      name: "Tab. Gluformin 1000"
    }
  },
  {
    country: {
      name: "Tab. Gluformin 3 Forte"
    }
  },
  {
    country: {
      name: "Tab. Gluformin 500"
    }
  },
  {
    country: {
      name: "Tab. Gluformin 850"
    }
  },
  {
    country: {
      name: "Tab. Gluformin G 1 Forte"
    }
  },
  {
    country: {
      name: "Tab. Gluformin G 2"
    }
  },
  {
    country: {
      name: "Tab. Gluformin G 4"
    }
  },
  {
    country: {
      name: "Tab. Gluformin G1"
    }
  },
  {
    country: {
      name: "Tab. Gluformin G1 forte"
    }
  },
  {
    country: {
      name: "Tab. Gluformin G2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Gluformin SR 1000"
    }
  },
  {
    country: {
      name: "Tab. Gluformin XL 1000"
    }
  },
  {
    country: {
      name: "Tab. Gluformin XL 500"
    }
  },
  {
    country: {
      name: "Tab. Gluformin Xl 250"
    }
  },
  {
    country: {
      name: "Tab. Gluformin g2"
    }
  },
  {
    country: {
      name: "Tab. Glurib M"
    }
  },
  {
    country: {
      name: "Tab. Glusens 1"
    }
  },
  {
    country: {
      name: "Tab. Glusens M2"
    }
  },
  {
    country: {
      name: "Tab. Glutide CR 30"
    }
  },
  {
    country: {
      name: "Tab. Glutide CR-60"
    }
  },
  {
    country: {
      name: "Tab. Gluzamet"
    }
  },
  {
    country: {
      name: "Tab. Glyade MR 30"
    }
  },
  {
    country: {
      name: "Tab. Glyboral 2.5"
    }
  },
  {
    country: {
      name: "Tab. Glyboral 5"
    }
  },
  {
    country: {
      name: "Tab. Glyborin 1.5"
    }
  },
  {
    country: {
      name: "Tab. Glyborin 5"
    }
  },
  {
    country: {
      name: "Tab. Glybovin 1.25 mg"
    }
  },
  {
    country: {
      name: "Tab. Glybovin 2.5"
    }
  },
  {
    country: {
      name: "Tab. Glybovin 2.5 mg"
    }
  },
  {
    country: {
      name: "Tab. Glybovin 5mg"
    }
  },
  {
    country: {
      name: "Tab. Glyburide 5mg"
    }
  },
  {
    country: {
      name: "Tab. Glycerna Powder"
    }
  },
  {
    country: {
      name: "Tab. Glycheck 40"
    }
  },
  {
    country: {
      name: "Tab. Glycheck 80"
    }
  },
  {
    country: {
      name: "Tab. Glychek 80"
    }
  },
  {
    country: {
      name: "Tab. Glychek M 40/500"
    }
  },
  {
    country: {
      name: "Tab. Glychek M forte"
    }
  },
  {
    country: {
      name: "Tab. Glycigon 80"
    }
  },
  {
    country: {
      name: "Tab. Glycigon M"
    }
  },
  {
    country: {
      name: "Tab. Glycigon-M 500"
    }
  },
  {
    country: {
      name: "Tab. Glycinorm 160"
    }
  },
  {
    country: {
      name: "Tab. Glycinorm 30 mg"
    }
  },
  {
    country: {
      name: "Tab. Glycinorm 40"
    }
  },
  {
    country: {
      name: "Tab. Glycinorm 60"
    }
  },
  {
    country: {
      name: "Tab. Glycinorm 80"
    }
  },
  {
    country: {
      name: "Tab. Glycinorm M 40/500"
    }
  },
  {
    country: {
      name: "Tab. Glycinorm M 60"
    }
  },
  {
    country: {
      name: "Tab. Glycinorm M 80"
    }
  },
  {
    country: {
      name: "Tab. Glycinorm M OD 30"
    }
  },
  {
    country: {
      name: "Tab. Glycinorm M OD 60"
    }
  },
  {
    country: {
      name: "Tab. Glycinorm OD 30"
    }
  },
  {
    country: {
      name: "Tab. Glycinorm OD 60"
    }
  },
  {
    country: {
      name: "Tab. Glycinorm Total 30"
    }
  },
  {
    country: {
      name: "Tab. Glycinorm Total 30/7.5"
    }
  },
  {
    country: {
      name: "Tab. Glycinorm Total 60"
    }
  },
  {
    country: {
      name: "Tab. Glycinorm Total 60/7.5"
    }
  },
  {
    country: {
      name: "Tab. Glycinorm m 40"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage 1000"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage 1mg"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage 250"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage 500"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage 850"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage G 2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage G 3 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage G1"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage G1 forte"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage G2"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage G2 forte"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage P 15"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage PG 1"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage PG 2"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage SR 1 gm"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage SR 1000"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage SR 500"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage SR 850"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage VG 1"
    }
  },
  {
    country: {
      name: "Tab. Glyciphage VG2"
    }
  },
  {
    country: {
      name: "Tab. Glyciphase 650"
    }
  },
  {
    country: {
      name: "Tab. Glycirite Gp1"
    }
  },
  {
    country: {
      name: "Tab. Glycomet"
    }
  },
  {
    country: {
      name: "Tab. Glycomet 1"
    }
  },
  {
    country: {
      name: "Tab. Glycomet 1000"
    }
  },
  {
    country: {
      name: "Tab. Glycomet 1000 SR"
    }
  },
  {
    country: {
      name: "Tab. Glycomet 250"
    }
  },
  {
    country: {
      name: "Tab. Glycomet 50/500"
    }
  },
  {
    country: {
      name: "Tab. Glycomet 500"
    }
  },
  {
    country: {
      name: "Tab. Glycomet 500 SR"
    }
  },
  {
    country: {
      name: "Tab. Glycomet 500 mg"
    }
  },
  {
    country: {
      name: "Tab. Glycomet 850"
    }
  },
  {
    country: {
      name: "Tab. Glycomet 850 sr"
    }
  },
  {
    country: {
      name: "Tab. Glycomet G4"
    }
  },
  {
    country: {
      name: "Tab. Glycomet GP 0.5"
    }
  },
  {
    country: {
      name: "Tab. Glycomet GP 1 forte"
    }
  },
  {
    country: {
      name: "Tab. Glycomet GP 1/850"
    }
  },
  {
    country: {
      name: "Tab. Glycomet GP 2/850"
    }
  },
  {
    country: {
      name: "Tab. Glycomet GP 3 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glycomet GP 4"
    }
  },
  {
    country: {
      name: "Tab. Glycomet GP 5"
    }
  },
  {
    country: {
      name: "Tab. Glycomet GP forte"
    }
  },
  {
    country: {
      name: "Tab. Glycomet GP1"
    }
  },
  {
    country: {
      name: "Tab. Glycomet GP1 forte"
    }
  },
  {
    country: {
      name: "Tab. Glycomet GP2"
    }
  },
  {
    country: {
      name: "Tab. Glycomet GP2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glycomet GP3/850"
    }
  },
  {
    country: {
      name: "Tab. Glycomet M 80"
    }
  },
  {
    country: {
      name: "Tab. Glycomet SR 500"
    }
  },
  {
    country: {
      name: "Tab. Glycomet Sr 850"
    }
  },
  {
    country: {
      name: "Tab. Glycomet TRIO 1"
    }
  },
  {
    country: {
      name: "Tab. Glycomet TRIO 1/0.3"
    }
  },
  {
    country: {
      name: "Tab. Glycomet TRIO 2"
    }
  },
  {
    country: {
      name: "Tab. Glycomet TRIO 2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glycomet TRIO 2/0.3"
    }
  },
  {
    country: {
      name: "Tab. Glycomet TRIO Forte"
    }
  },
  {
    country: {
      name: "Tab. Glycomet TRIO Forte 1"
    }
  },
  {
    country: {
      name: "Tab. Glycomet TRIO Forte 2"
    }
  },
  {
    country: {
      name: "Tab. Glycomet TRIO Forte 3"
    }
  },
  {
    country: {
      name: "Tab. Glycomet Trio"
    }
  },
  {
    country: {
      name: "Tab. Glycomet gp 0.5 forte"
    }
  },
  {
    country: {
      name: "Tab. Glycomet gp 3"
    }
  },
  {
    country: {
      name: "Tab. Glycomet gp4 forte"
    }
  },
  {
    country: {
      name: "Tab. Glycomet trio 2 mg"
    }
  },
  {
    country: {
      name: "Tab. Glykind M"
    }
  },
  {
    country: {
      name: "Tab. Glykind M 80"
    }
  },
  {
    country: {
      name: "Tab. Glyloc 40"
    }
  },
  {
    country: {
      name: "Tab. Glyloc 80"
    }
  },
  {
    country: {
      name: "Tab. Glyloc M"
    }
  },
  {
    country: {
      name: "Tab. Glyloc M 80"
    }
  },
  {
    country: {
      name: "Tab. Glymat 80/500"
    }
  },
  {
    country: {
      name: "Tab. Glymet 1"
    }
  },
  {
    country: {
      name: "Tab. Glynase"
    }
  },
  {
    country: {
      name: "Tab. Glynase 30"
    }
  },
  {
    country: {
      name: "Tab. Glynase 5"
    }
  },
  {
    country: {
      name: "Tab. Glynase MF"
    }
  },
  {
    country: {
      name: "Tab. Glynase MF Forte"
    }
  },
  {
    country: {
      name: "Tab. Glynase XL 10"
    }
  },
  {
    country: {
      name: "Tab. Glynase XL 5"
    }
  },
  {
    country: {
      name: "Tab. Glypride 1"
    }
  },
  {
    country: {
      name: "Tab. Glypride 2"
    }
  },
  {
    country: {
      name: "Tab. Glypride 4"
    }
  },
  {
    country: {
      name: "Tab. Glypten 20 mg"
    }
  },
  {
    country: {
      name: "Tab. Glypten M 20mg"
    }
  },
  {
    country: {
      name: "Tab. Glypten M Forte 1000/20"
    }
  },
  {
    country: {
      name: "Tab. Glypten-M"
    }
  },
  {
    country: {
      name: "Tab. Glyree 0.5"
    }
  },
  {
    country: {
      name: "Tab. Glyree 1"
    }
  },
  {
    country: {
      name: "Tab. Glyree 2"
    }
  },
  {
    country: {
      name: "Tab. Glyree 3"
    }
  },
  {
    country: {
      name: "Tab. Glyree 4"
    }
  },
  {
    country: {
      name: "Tab. Glyree M 1"
    }
  },
  {
    country: {
      name: "Tab. Glyree M 1 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glyree M 2"
    }
  },
  {
    country: {
      name: "Tab. Glyree M2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Glyree MP 1"
    }
  },
  {
    country: {
      name: "Tab. Glyree MP 2"
    }
  },
  {
    country: {
      name: "Tab. Glyree MP1"
    }
  },
  {
    country: {
      name: "Tab. Glyree MV 1"
    }
  },
  {
    country: {
      name: "Tab. Glyree MV 2"
    }
  },
  {
    country: {
      name: "Tab. Glytop 10 Sr"
    }
  },
  {
    country: {
      name: "Tab. Glytop SR 10"
    }
  },
  {
    country: {
      name: "Tab. Glytop SR 2.5"
    }
  },
  {
    country: {
      name: "Tab. Glytop SR 5"
    }
  },
  {
    country: {
      name: "Tab. Glytrin met 20 /500"
    }
  },
  {
    country: {
      name: "Tab. Glyxambi 10/5"
    }
  },
  {
    country: {
      name: "Tab. Glyxambi 25/5"
    }
  },
  {
    country: {
      name: "Tab. Glyzet SR 1gm"
    }
  },
  {
    country: {
      name: "Tab. GmetFor 1"
    }
  },
  {
    country: {
      name: "Tab. Gmm V Forte"
    }
  },
  {
    country: {
      name: "Tab. Gp 4"
    }
  },
  {
    country: {
      name: "Tab. Gp. 0.5"
    }
  },
  {
    country: {
      name: "Tab. Gpride M3"
    }
  },
  {
    country: {
      name: "Tab. Gpride-M1"
    }
  },
  {
    country: {
      name: "Tab. Gulonorm G 3 Fort"
    }
  },
  {
    country: {
      name: "Tab. Gymnex"
    }
  },
  {
    country: {
      name: "Tab. Gzide XR 60"
    }
  },
  {
    country: {
      name: "Inj. Humalog 30/70"
    }
  },
  {
    country: {
      name: "Tab. Human Mixtard 30/20"
    }
  },
  {
    country: {
      name: "Inj. Human Mixtard 40"
    }
  },
  {
    country: {
      name: "Tab. Human mixtard 30 /70"
    }
  },
  {
    country: {
      name: "Inj. Huminsulin 30/70"
    }
  },
  {
    country: {
      name: "Tab. Humulin R"
    }
  },
  {
    country: {
      name: "Tab. IME 9"
    }
  },
  {
    country: {
      name: "Inj. INJ.SOLIQUA ( GLARGINE AND LIXISENA"
    }
  },
  {
    country: {
      name: "Tab. INSUGEN 30/70"
    }
  },
  {
    country: {
      name: "Tab. Ibgliptin 20"
    }
  },
  {
    country: {
      name: "Tab. Incresync 25/15"
    }
  },
  {
    country: {
      name: "Tab. Inogla 20 / 500"
    }
  },
  {
    country: {
      name: "Tab. Inogla M"
    }
  },
  {
    country: {
      name: "Tab. Inogla M 20/1000"
    }
  },
  {
    country: {
      name: "Tab. Insta 0.2"
    }
  },
  {
    country: {
      name: "Tab. Insta 0.3"
    }
  },
  {
    country: {
      name: "Tab. Instamet 50/500"
    }
  },
  {
    country: {
      name: "Tab. Insuglin"
    }
  },
  {
    country: {
      name: "Inj. Insulatard"
    }
  },
  {
    country: {
      name: "Inj. Insuman comb 25/75"
    }
  },
  {
    country: {
      name: "Tab. Invokana 100"
    }
  },
  {
    country: {
      name: "Tab. Invokana 300"
    }
  },
  {
    country: {
      name: "Tab. Ismet 500"
    }
  },
  {
    country: {
      name: "Tab. Ismet SR 500"
    }
  },
  {
    country: {
      name: "Tab. Ismosol -XR 60"
    }
  },
  {
    country: {
      name: "Tab. Isryl 1mg"
    }
  },
  {
    country: {
      name: "Tab. Isryl M 1"
    }
  },
  {
    country: {
      name: "Tab. Isryl M 2"
    }
  },
  {
    country: {
      name: "Tab. Istamet 1000"
    }
  },
  {
    country: {
      name: "Tab. Istamet 50/1000"
    }
  },
  {
    country: {
      name: "Tab. Istamet 50/500"
    }
  },
  {
    country: {
      name: "Tab. Istamet 500"
    }
  },
  {
    country: {
      name: "Tab. Istamet XR CP 100/1000"
    }
  },
  {
    country: {
      name: "Tab. Istavel 100"
    }
  },
  {
    country: {
      name: "Tab. Istavel 25"
    }
  },
  {
    country: {
      name: "Tab. Istavel 50"
    }
  },
  {
    country: {
      name: "Tab. J Ring 20"
    }
  },
  {
    country: {
      name: "Tab. JANUVIA 50 /500MG"
    }
  },
  {
    country: {
      name: "Tab. Jalra 25"
    }
  },
  {
    country: {
      name: "Tab. Jalra 50"
    }
  },
  {
    country: {
      name: "Tab. Jalra 50/500"
    }
  },
  {
    country: {
      name: "Tab. Jalra 50/850"
    }
  },
  {
    country: {
      name: "Tab. Jalra M"
    }
  },
  {
    country: {
      name: "Tab. Jalra M 50"
    }
  },
  {
    country: {
      name: "Tab. Jalra M 50/1000"
    }
  },
  {
    country: {
      name: "Tab. Jalra M 50/500"
    }
  },
  {
    country: {
      name: "Tab. Jalra M 50/850"
    }
  },
  {
    country: {
      name: "Tab. Jalra M 500"
    }
  },
  {
    country: {
      name: "Tab. Janumet"
    }
  },
  {
    country: {
      name: "Tab. Janumet 100"
    }
  },
  {
    country: {
      name: "Tab. Janumet 100/1000"
    }
  },
  {
    country: {
      name: "Tab. Janumet 1000"
    }
  },
  {
    country: {
      name: "Tab. Janumet 50 / 500"
    }
  },
  {
    country: {
      name: "Tab. Janumet 50/1000"
    }
  },
  {
    country: {
      name: "Tab. Janumet 50/500"
    }
  },
  {
    country: {
      name: "Tab. Janumet 50/850"
    }
  },
  {
    country: {
      name: "Tab. Janumet 500"
    }
  },
  {
    country: {
      name: "Tab. Janumet XR"
    }
  },
  {
    country: {
      name: "Tab. Janumet XR 50/1000"
    }
  },
  {
    country: {
      name: "Tab. Janumet XR 50/500"
    }
  },
  {
    country: {
      name: "Tab. Janumet XR CP 100 / 1000"
    }
  },
  {
    country: {
      name: "Tab. Janumet Xr Cp"
    }
  },
  {
    country: {
      name: "Tab. Januvia"
    }
  },
  {
    country: {
      name: "Tab. Januvia 100"
    }
  },
  {
    country: {
      name: "Tab. Januvia 150"
    }
  },
  {
    country: {
      name: "Tab. Januvia 25"
    }
  },
  {
    country: {
      name: "Tab. Januvia 50"
    }
  },
  {
    country: {
      name: "Tab. Jardiance 10"
    }
  },
  {
    country: {
      name: "Tab. Jardiance 10 mg"
    }
  },
  {
    country: {
      name: "Tab. Jardiance 20"
    }
  },
  {
    country: {
      name: "Tab. Jardiance 25"
    }
  },
  {
    country: {
      name: "Tab. Jardiance Met 1000+12.5"
    }
  },
  {
    country: {
      name: "Tab. Jardiance XR 12.5/500"
    }
  },
  {
    country: {
      name: "Tab. Jentadueto 2.5/1000"
    }
  },
  {
    country: {
      name: "Tab. Jubiglim M1"
    }
  },
  {
    country: {
      name: "Tab. Metformin"
    }
  },
  {
    country: {
      name: "Tab. Metformin 1000"
    }
  },
  {
    country: {
      name: "Tab. Metformin 250"
    }
  },
  {
    country: {
      name: "Tab. Metformin 500"
    }
  },
  {
    country: {
      name: "Tab. Metformin 750"
    }
  },
  {
    country: {
      name: "Tab. Metformin 850"
    }
  },
  {
    country: {
      name: "Tab. Metformin ER 1500"
    }
  },
  {
    country: {
      name: "Tab. Metformin HCL 1000"
    }
  },
  {
    country: {
      name: "Tab. Metformin HCL 500"
    }
  },
  {
    country: {
      name: "Tab. Metformin SR"
    }
  },
  {
    country: {
      name: "Tab. Metformin SR 1000"
    }
  },
  {
    country: {
      name: "Tab. Metformin SR 500"
    }
  },
  {
    country: {
      name: "Tab. Metformin SR 850"
    }
  },
  {
    country: {
      name: "Tab. Metformin2000"
    }
  },
  {
    country: {
      name: "Tab. Metium G2"
    }
  },
  {
    country: {
      name: "Tab. Metlibose plus 0.3"
    }
  },
  {
    country: {
      name: "Tab. Metlong -Ds 1000"
    }
  },
  {
    country: {
      name: "Tab. Metlong 500"
    }
  },
  {
    country: {
      name: "Tab. Metocarb Sr 500"
    }
  },
  {
    country: {
      name: "Tab. Metofix XL 1000"
    }
  },
  {
    country: {
      name: "Tab. Metol OD 1000"
    }
  },
  {
    country: {
      name: "Tab. Metride 1"
    }
  },
  {
    country: {
      name: "Tab. Metride 2"
    }
  },
  {
    country: {
      name: "Tab. Metride DS 1"
    }
  },
  {
    country: {
      name: "Tab. Metride Plus"
    }
  },
  {
    country: {
      name: "Tab. Metride Plus 1"
    }
  },
  {
    country: {
      name: "Tab. Metride Plus 2"
    }
  },
  {
    country: {
      name: "Tab. Metsar 1000 SR"
    }
  },
  {
    country: {
      name: "Tab. Metsar 500"
    }
  },
  {
    country: {
      name: "Tab. Metsmall"
    }
  },
  {
    country: {
      name: "Tab. Metsmall 1 gm"
    }
  },
  {
    country: {
      name: "Tab. Metsmall 1000"
    }
  },
  {
    country: {
      name: "Tab. Metsmall 500"
    }
  },
  {
    country: {
      name: "Tab. Metsmall 850"
    }
  },
  {
    country: {
      name: "Tab. Metsmall SR 500"
    }
  },
  {
    country: {
      name: "Tab. Metzia G2"
    }
  },
  {
    country: {
      name: "Tab. Mignar 25"
    }
  },
  {
    country: {
      name: "Tab. Mignar 50"
    }
  },
  {
    country: {
      name: "Tab. Mignar MF 25"
    }
  },
  {
    country: {
      name: "Tab. Mignar MF 50"
    }
  },
  {
    country: {
      name: "Inj. Mixtard 50/50"
    }
  },
  {
    country: {
      name: "Tab. Mopaday 15"
    }
  },
  {
    country: {
      name: "Tab. Mopaday forte"
    }
  },
  {
    country: {
      name: "Tab. Moringa pill"
    }
  },
  {
    country: {
      name: "Tab. Motivyst 300"
    }
  },
  {
    country: {
      name: "Tab. Moxilong 0.2"
    }
  },
  {
    country: {
      name: "Tab. Moxilong 0.3"
    }
  },
  {
    country: {
      name: "Tab. Moxocard 0.3"
    }
  },
  {
    country: {
      name: "Tab. Moxovas 0.2"
    }
  },
  {
    country: {
      name: "Tab. Moxovas 0.3"
    }
  },
  {
    country: {
      name: "Tab. Moxovas 0.3"
    }
  },
  {
    country: {
      name: "Tab. Nateglenide 120mg"
    }
  },
  {
    country: {
      name: "Tab. New Triclazone 80"
    }
  },
  {
    country: {
      name: "Tab. New Triglucored forte"
    }
  },
  {
    country: {
      name: "Tab. New triclazone 40"
    }
  },
  {
    country: {
      name: "Tab. Nishamalaki"
    }
  },
  {
    country: {
      name: "Inj. Novomix 30"
    }
  },
  {
    country: {
      name: "Inj. Novomix 30/70"
    }
  },
  {
    country: {
      name: "Inj. Novomix 50"
    }
  },
  {
    country: {
      name: "Tab. Novonorm 0.5"
    }
  },
  {
    country: {
      name: "Tab. Novonorm 1"
    }
  },
  {
    country: {
      name: "Tab. Novonorm 2"
    }
  },
  {
    country: {
      name: "Inj. Novorapid"
    }
  },
  {
    country: {
      name: "Tab. Nuformin SR 500"
    }
  },
  {
    country: {
      name: "Tab. Nuformin-G"
    }
  },
  {
    country: {
      name: "Tab. Nuzide M"
    }
  },
  {
    country: {
      name: "Tab. Nuzide XL-30"
    }
  },
  {
    country: {
      name: "Tab. Nuzide XL-60"
    }
  },
  {
    country: {
      name: "Tab. Obimet 1 SR"
    }
  },
  {
    country: {
      name: "Tab. Obimet 500"
    }
  },
  {
    country: {
      name: "Tab. Obimet GX 0.5"
    }
  },
  {
    country: {
      name: "Tab. Obimet GX forte-1"
    }
  },
  {
    country: {
      name: "Tab. Obimet GX-1"
    }
  },
  {
    country: {
      name: "Tab. Obimet GX-2"
    }
  },
  {
    country: {
      name: "Tab. Obimet GX2"
    }
  },
  {
    country: {
      name: "Tab. Obimet SR 500"
    }
  },
  {
    country: {
      name: "Tab. Obimet V 0.2"
    }
  },
  {
    country: {
      name: "Tab. Obimet V 0.3"
    }
  },
  {
    country: {
      name: "Tab. Obimet sr 1000"
    }
  },
  {
    country: {
      name: "Tab. Okamet 500"
    }
  },
  {
    country: {
      name: "Tab. Olglimide M1"
    }
  },
  {
    country: {
      name: "Tab. Olymprix 20"
    }
  },
  {
    country: {
      name: "Tab. Olymprix M"
    }
  },
  {
    country: {
      name: "Tab. Olymprix M 1000"
    }
  },
  {
    country: {
      name: "Tab. Olymprix M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Olymprix M 500"
    }
  },
  {
    country: {
      name: "Tab. Ondero 5"
    }
  },
  {
    country: {
      name: "Tab. Ondero Met 2.5/1000"
    }
  },
  {
    country: {
      name: "Tab. Onderomet (2.5+850)"
    }
  },
  {
    country: {
      name: "Tab. Onderomet 2.5/500"
    }
  },
  {
    country: {
      name: "Tab. Onderomet 2.5/850"
    }
  },
  {
    country: {
      name: "Tab. Onglyza 2.5"
    }
  },
  {
    country: {
      name: "Tab. Onglyza 5"
    }
  },
  {
    country: {
      name: "Tab. Oramet 500"
    }
  },
  {
    country: {
      name: "Tab. Oxra 10 mg"
    }
  },
  {
    country: {
      name: "Tab. Oxra 5"
    }
  },
  {
    country: {
      name: "Tab. Oxramet 10/1000"
    }
  },
  {
    country: {
      name: "Tab. Oxramet 10/500"
    }
  },
  {
    country: {
      name: "Tab. Ozomet G1"
    }
  },
  {
    country: {
      name: "Tab. Ozomet VG 2"
    }
  },
  {
    country: {
      name: "Tab. Ozomet Vg2"
    }
  },
  {
    country: {
      name: "Tab. Ozomet Vg2"
    }
  },
  {
    country: {
      name: "Tab. PPG 0.2"
    }
  },
  {
    country: {
      name: "Tab. PPG 0.3"
    }
  },
  {
    country: {
      name: "Tab. PPG Met 0.3"
    }
  },
  {
    country: {
      name: "Tab. PPG met 0.2"
    }
  },
  {
    country: {
      name: "Tab. PPG met 0.2/500"
    }
  },
  {
    country: {
      name: "Tab. PPG met 0.3/500"
    }
  },
  {
    country: {
      name: "Tab. Patten M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Path 15"
    }
  },
  {
    country: {
      name: "Tab. Path 7.5"
    }
  },
  {
    country: {
      name: "Tab. Path G2"
    }
  },
  {
    country: {
      name: "Tab. Petten M"
    }
  },
  {
    country: {
      name: "Tab. Pigma MF"
    }
  },
  {
    country: {
      name: "Tab. Piobit Gm2"
    }
  },
  {
    country: {
      name: "Tab. Pioglar 15"
    }
  },
  {
    country: {
      name: "Tab. Pioglar 30"
    }
  },
  {
    country: {
      name: "Tab. Pioglar 7.5"
    }
  },
  {
    country: {
      name: "Tab. Pioglar G"
    }
  },
  {
    country: {
      name: "Tab. Pioglar GF 32 capsule"
    }
  },
  {
    country: {
      name: "Tab. Pioglar MF 15/500"
    }
  },
  {
    country: {
      name: "Tab. Pioglar MF 7.5"
    }
  },
  {
    country: {
      name: "Tab. Pioglimet"
    }
  },
  {
    country: {
      name: "Tab. Pioglit 15"
    }
  },
  {
    country: {
      name: "Tab. Pioglit 30"
    }
  },
  {
    country: {
      name: "Tab. Pioglit 7.5"
    }
  },
  {
    country: {
      name: "Tab. Pioglit MF 7.5"
    }
  },
  {
    country: {
      name: "Tab. Pioglit-G"
    }
  },
  {
    country: {
      name: "Tab. Pioglitazone hcl 30 mg"
    }
  },
  {
    country: {
      name: "Tab. Piokind 15"
    }
  },
  {
    country: {
      name: "Tab. Piokind M-15"
    }
  },
  {
    country: {
      name: "Tab. Piolon 15"
    }
  },
  {
    country: {
      name: "Tab. Piomed 15 mg"
    }
  },
  {
    country: {
      name: "Tab. Pionorm GM"
    }
  },
  {
    country: {
      name: "Tab. Piopar 15"
    }
  },
  {
    country: {
      name: "Tab. Piopar 7.5"
    }
  },
  {
    country: {
      name: "Tab. Piopar 7.5 MF"
    }
  },
  {
    country: {
      name: "Tab. Piopod 15"
    }
  },
  {
    country: {
      name: "Tab. Piopod MF G1"
    }
  },
  {
    country: {
      name: "Tab. Piosys 15"
    }
  },
  {
    country: {
      name: "Tab. Piosys 30"
    }
  },
  {
    country: {
      name: "Tab. Piota Mf 15/500"
    }
  },
  {
    country: {
      name: "Tab. Pioz - MF"
    }
  },
  {
    country: {
      name: "Tab. Pioz - MF-G-1"
    }
  },
  {
    country: {
      name: "Tab. Pioz - MF-G-2"
    }
  },
  {
    country: {
      name: "Tab. Pioz - MF-G-2 forte"
    }
  },
  {
    country: {
      name: "Tab. Pioz -30"
    }
  },
  {
    country: {
      name: "Tab. Pioz 15"
    }
  },
  {
    country: {
      name: "Tab. Pioz 7.5"
    }
  },
  {
    country: {
      name: "Tab. Pioz MF 15"
    }
  },
  {
    country: {
      name: "Tab. Pioz MF 7.5"
    }
  },
  {
    country: {
      name: "Tab. Pioz Mf 7.5/500"
    }
  },
  {
    country: {
      name: "Tab. Poita Mf15/500"
    }
  },
  {
    country: {
      name: "Tab. Posmeal 0.3"
    }
  },
  {
    country: {
      name: "Tab. Prandial 0.2"
    }
  },
  {
    country: {
      name: "Tab. Prandial 0.2 MD"
    }
  },
  {
    country: {
      name: "Tab. Prandial 0.3"
    }
  },
  {
    country: {
      name: "Tab. Prandial M 0.2"
    }
  },
  {
    country: {
      name: "Tab. Prandial MD"
    }
  },
  {
    country: {
      name: "Tab. Prandial-M 0.2 & 0.3"
    }
  },
  {
    country: {
      name: "Tab. Pre-check M2"
    }
  },
  {
    country: {
      name: "Tab. Prebose 0.3"
    }
  },
  {
    country: {
      name: "Tab. Pricheck M1"
    }
  },
  {
    country: {
      name: "Tab. Pricheck M2"
    }
  },
  {
    country: {
      name: "Tab. Pricheck gm p1"
    }
  },
  {
    country: {
      name: "Tab. Primacal AT"
    }
  },
  {
    country: {
      name: "Tab. Prizide-M 40"
    }
  },
  {
    country: {
      name: "Tab. Prograf 1.5 mg"
    }
  },
  {
    country: {
      name: "Tab. Prominad"
    }
  },
  {
    country: {
      name: "Tab. Rainian XR 60/500"
    }
  },
  {
    country: {
      name: "Tab. Ramo 500"
    }
  },
  {
    country: {
      name: "Tab. Reclimet M"
    }
  },
  {
    country: {
      name: "Tab. Reclide 20"
    }
  },
  {
    country: {
      name: "Tab. Reclide 40"
    }
  },
  {
    country: {
      name: "Tab. Reclide 80"
    }
  },
  {
    country: {
      name: "Tab. Reclide M 80"
    }
  },
  {
    country: {
      name: "Tab. Reclide MR"
    }
  },
  {
    country: {
      name: "Tab. Reclide MR 30"
    }
  },
  {
    country: {
      name: "Tab. Reclide MR 60"
    }
  },
  {
    country: {
      name: "Tab. Reclide XR 30"
    }
  },
  {
    country: {
      name: "Tab. Reclide XR 60"
    }
  },
  {
    country: {
      name: "Tab. Reclide XR 60/500"
    }
  },
  {
    country: {
      name: "Tab. Reclimet"
    }
  },
  {
    country: {
      name: "Tab. Reclimet 500"
    }
  },
  {
    country: {
      name: "Tab. Reclimet 80/500"
    }
  },
  {
    country: {
      name: "Tab. Reclimet OD 30"
    }
  },
  {
    country: {
      name: "Tab. Reclimet OD 60"
    }
  },
  {
    country: {
      name: "Tab. Reclimet XR"
    }
  },
  {
    country: {
      name: "Tab. Reclimet XR 60"
    }
  },
  {
    country: {
      name: "Tab. Reclimet xr 60/500"
    }
  },
  {
    country: {
      name: "Tab. Regan 1mg"
    }
  },
  {
    country: {
      name: "Tab. Regan 2mg"
    }
  },
  {
    country: {
      name: "Tab. Remo 100"
    }
  },
  {
    country: {
      name: "Tab. Riax 2.5"
    }
  },
  {
    country: {
      name: "Tab. Riax 5"
    }
  },
  {
    country: {
      name: "Tab. Riax M 5/500"
    }
  },
  {
    country: {
      name: "Tab. Riax MXR 5/1000"
    }
  },
  {
    country: {
      name: "Tab. Riax MXR 5/500"
    }
  },
  {
    country: {
      name: "Tab. Riaz 5 mg"
    }
  },
  {
    country: {
      name: "Tab. Riomet 500"
    }
  },
  {
    country: {
      name: "Tab. Riomet DUO 2"
    }
  },
  {
    country: {
      name: "Tab. Riomet DUO-1"
    }
  },
  {
    country: {
      name: "Tab. Riomet OD 1000"
    }
  },
  {
    country: {
      name: "Tab. Riomet OD 500"
    }
  },
  {
    country: {
      name: "Tab. Riomet OD 850"
    }
  },
  {
    country: {
      name: "Tab. Saxagliptin"
    }
  },
  {
    country: {
      name: "Tab. Sefmet PGL 2"
    }
  },
  {
    country: {
      name: "Tab. Semi Amaryl"
    }
  },
  {
    country: {
      name: "Tab. Semi Daonil 2.5"
    }
  },
  {
    country: {
      name: "Tab. Semi Euglucon"
    }
  },
  {
    country: {
      name: "Tab. Semi Glynase"
    }
  },
  {
    country: {
      name: "Tab. Semi Reclimet"
    }
  },
  {
    country: {
      name: "Tab. Semi Reclimet 40/500"
    }
  },
  {
    country: {
      name: "Tab. Semi Reclimet 500"
    }
  },
  {
    country: {
      name: "Tab. Semi Tribet"
    }
  },
  {
    country: {
      name: "Tab. Semi Trigem 2"
    }
  },
  {
    country: {
      name: "Tab. Semi daonil"
    }
  },
  {
    country: {
      name: "Tab. Semi glizid M"
    }
  },
  {
    country: {
      name: "Tab. Semi tribet 2"
    }
  },
  {
    country: {
      name: "Tab. Semi-Tribet"
    }
  },
  {
    country: {
      name: "Tab. Semidaonil"
    }
  },
  {
    country: {
      name: "Tab. Semireclimet 40/500"
    }
  },
  {
    country: {
      name: "Tab. Siptin M 850mg"
    }
  },
  {
    country: {
      name: "Tab. Sitagliptin 50"
    }
  },
  {
    country: {
      name: "Tab. Stabose 0.2"
    }
  },
  {
    country: {
      name: "Tab. Stabose 0.3"
    }
  },
  {
    country: {
      name: "Tab. Stabose M 0.2"
    }
  },
  {
    country: {
      name: "Tab. Stabose M 0.3"
    }
  },
  {
    country: {
      name: "Tab. Stagmet"
    }
  },
  {
    country: {
      name: "Tab. Starvog 0.3"
    }
  },
  {
    country: {
      name: "Tab. Starvog 1"
    }
  },
  {
    country: {
      name: "Tab. Starvog M 0.3"
    }
  },
  {
    country: {
      name: "Tab. Starvog2"
    }
  },
  {
    country: {
      name: "Tab. Sugamet Mc 500"
    }
  },
  {
    country: {
      name: "Tab. Sugamide"
    }
  },
  {
    country: {
      name: "Tab. Sugasol M2 SR"
    }
  },
  {
    country: {
      name: "Tab. Sukkarto SR 1000mg"
    }
  },
  {
    country: {
      name: "Tab. Sulicent"
    }
  },
  {
    country: {
      name: "Tab. Sulisent 100"
    }
  },
  {
    country: {
      name: "Tab. Supraglip M"
    }
  },
  {
    country: {
      name: "Tab. Switglim 1/1000"
    }
  },
  {
    country: {
      name: "Tab. Switglim M 2/1000"
    }
  },
  {
    country: {
      name: "Tab. Switglim M 2/500"
    }
  },
  {
    country: {
      name: "Tab. Switglim M 4/500"
    }
  },
  {
    country: {
      name: "Tab. Switglim M2/1000"
    }
  },
  {
    country: {
      name: "Tab. Switglim MP 1/15"
    }
  },
  {
    country: {
      name: "Tab. Switglim MP2"
    }
  },
  {
    country: {
      name: "Tab. Switglim MV 1"
    }
  },
  {
    country: {
      name: "Tab. Switglim-M 1/500"
    }
  },
  {
    country: {
      name: "Tab. T Glip-M 500"
    }
  },
  {
    country: {
      name: "Tab. T Vobit 1"
    }
  },
  {
    country: {
      name: "Tab. T glip 20"
    }
  },
  {
    country: {
      name: "Tab. T- Vobit 1/0.2/500"
    }
  },
  {
    country: {
      name: "Tab. TENEBITE M 500"
    }
  },
  {
    country: {
      name: "Tab. TRIO 1"
    }
  },
  {
    country: {
      name: "Tab. TRIO 2"
    }
  },
  {
    country: {
      name: "Tab. Tab Ondero"
    }
  },
  {
    country: {
      name: "Tab. Tab.Ondero 5mg"
    }
  },
  {
    country: {
      name: "Tab. Tagon 20"
    }
  },
  {
    country: {
      name: "Tab. Teglipt 20"
    }
  },
  {
    country: {
      name: "Tab. Teglipt M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Telniglip 20"
    }
  },
  {
    country: {
      name: "Tab. Telniglip M"
    }
  },
  {
    country: {
      name: "Tab. Temur 20 mg"
    }
  },
  {
    country: {
      name: "Tab. Temur M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Ten M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Ten dc 20"
    }
  },
  {
    country: {
      name: "Tab. Tenali 20"
    }
  },
  {
    country: {
      name: "Tab. Tenali 40"
    }
  },
  {
    country: {
      name: "Tab. Tenali M"
    }
  },
  {
    country: {
      name: "Tab. Tenali M 1000"
    }
  },
  {
    country: {
      name: "Tab. Tenali M 500"
    }
  },
  {
    country: {
      name: "Tab. Tenaligliptin 20"
    }
  },
  {
    country: {
      name: "Tab. Tenamit 20"
    }
  },
  {
    country: {
      name: "Tab. Tenamit m"
    }
  },
  {
    country: {
      name: "Tab. Tendia 20"
    }
  },
  {
    country: {
      name: "Tab. Tendia M"
    }
  },
  {
    country: {
      name: "Tab. Tendia M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Tendia M Forte"
    }
  },
  {
    country: {
      name: "Tab. Tendia M Forte 20/1000"
    }
  },
  {
    country: {
      name: "Tab. Tendocare"
    }
  },
  {
    country: {
      name: "Tab. Tenebite 20 mg"
    }
  },
  {
    country: {
      name: "Tab. Tenebite M 20"
    }
  },
  {
    country: {
      name: "Tab. Tenebite M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Teneblu"
    }
  },
  {
    country: {
      name: "Tab. Tenefit 20"
    }
  },
  {
    country: {
      name: "Tab. Tenefit M"
    }
  },
  {
    country: {
      name: "Tab. Tenefit M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Teneglyn"
    }
  },
  {
    country: {
      name: "Tab. Teneglyn M"
    }
  },
  {
    country: {
      name: "Tab. Tenelegliptin 20"
    }
  },
  {
    country: {
      name: "Tab. Tenelegliptin M"
    }
  },
  {
    country: {
      name: "Tab. Teneli 20"
    }
  },
  {
    country: {
      name: "Tab. Tenelidib M 500 SR"
    }
  },
  {
    country: {
      name: "Tab. Teneliglip 20"
    }
  },
  {
    country: {
      name: "Tab. Teneliglip M"
    }
  },
  {
    country: {
      name: "Tab. Teneliglip M 1000"
    }
  },
  {
    country: {
      name: "Tab. Teneligliptin 20"
    }
  },
  {
    country: {
      name: "Tab. Teneligliptin 20/500"
    }
  },
  {
    country: {
      name: "Tab. Teneligliptin M 20/1000"
    }
  },
  {
    country: {
      name: "Tab. Teneligliptin m 20/500"
    }
  },
  {
    country: {
      name: "Tab. Tenepla 20"
    }
  },
  {
    country: {
      name: "Tab. Tenepla M1000"
    }
  },
  {
    country: {
      name: "Tab. Tenepride 20"
    }
  },
  {
    country: {
      name: "Tab. Tenepride M"
    }
  },
  {
    country: {
      name: "Tab. Tenepride M 1000"
    }
  },
  {
    country: {
      name: "Tab. Tenepride M 500"
    }
  },
  {
    country: {
      name: "Tab. Tenepure 20"
    }
  },
  {
    country: {
      name: "Tab. Tenepure M"
    }
  },
  {
    country: {
      name: "Tab. Tenepure M (500)"
    }
  },
  {
    country: {
      name: "Tab. Tenepure M 1000"
    }
  },
  {
    country: {
      name: "Tab. Tenepure M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Tenepure M 500"
    }
  },
  {
    country: {
      name: "Tab. Teneza 20"
    }
  },
  {
    country: {
      name: "Tab. Teneza M 20/1000"
    }
  },
  {
    country: {
      name: "Tab. Teneza M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Teneza M 500"
    }
  },
  {
    country: {
      name: "Tab. Tenglyn 20"
    }
  },
  {
    country: {
      name: "Tab. Tenglyn M"
    }
  },
  {
    country: {
      name: "Tab. Tenglyn M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Tenglyn m 500"
    }
  },
  {
    country: {
      name: "Tab. Tenglypt 20"
    }
  },
  {
    country: {
      name: "Tab. Tenglyu 20"
    }
  },
  {
    country: {
      name: "Tab. Tenglyu M 1000"
    }
  },
  {
    country: {
      name: "Tab. Tenglyu M 500"
    }
  },
  {
    country: {
      name: "Tab. Tenipack 20"
    }
  },
  {
    country: {
      name: "Tab. Teniva 20"
    }
  },
  {
    country: {
      name: "Tab. Teniva M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Tenlimac 20"
    }
  },
  {
    country: {
      name: "Tab. Tenlimac M"
    }
  },
  {
    country: {
      name: "Tab. Tenlimac M 1000"
    }
  },
  {
    country: {
      name: "Tab. Tenlimac M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Tenlip 20"
    }
  },
  {
    country: {
      name: "Tab. Tenlip M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Tenlip M 201000"
    }
  },
  {
    country: {
      name: "Tab. Tenlison 20"
    }
  },
  {
    country: {
      name: "Tab. Tenodax 20"
    }
  },
  {
    country: {
      name: "Tab. Tenomet"
    }
  },
  {
    country: {
      name: "Tab. Tensorin M"
    }
  },
  {
    country: {
      name: "Tab. Tensurin 20mg"
    }
  },
  {
    country: {
      name: "Tab. Tenumet 20/500"
    }
  },
  {
    country: {
      name: "Tab. Tenuvia 20"
    }
  },
  {
    country: {
      name: "Tab. Tenuvia M20/500"
    }
  },
  {
    country: {
      name: "Tab. Tenvia M forte"
    }
  },
  {
    country: {
      name: "Tab. Tenzulix 20"
    }
  },
  {
    country: {
      name: "Tab. Tenzulix M 1000"
    }
  },
  {
    country: {
      name: "Tab. Tenzulix M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Tenzulix M 500"
    }
  },
  {
    country: {
      name: "Tab. Teva Pioglitazone 30"
    }
  },
  {
    country: {
      name: "Tab. Tezaglit"
    }
  },
  {
    country: {
      name: "Tab. Tglip M 1000"
    }
  },
  {
    country: {
      name: "Tab. Tglip- M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Tiban 20"
    }
  },
  {
    country: {
      name: "Tab. Tiban M"
    }
  },
  {
    country: {
      name: "Tab. Tiban M 20/1000"
    }
  },
  {
    country: {
      name: "Tab. Tiban M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Tglip 20mg"
    }
  },
  {
    country: {
      name: "Tab. Topglim M2"
    }
  },
  {
    country: {
      name: "tab.Tenlimac"
    }
  },
  {
    country: {
      name: "Tab. Tenlimac 20/500"
    }
  },
  {
    country: {
      name: "Tab. Trajenta"
    }
  },
  {
    country: {
      name: "Tab. Trajenta 10"
    }
  },
  {
    country: {
      name: "Tab. Trajenta 5"
    }
  },
  {
    country: {
      name: "Tab. Trajenta Duo"
    }
  },
  {
    country: {
      name: "Tab. Trajenta Duo 1000"
    }
  },
  {
    country: {
      name: "Tab. Trajenta Duo 2.5/1000"
    }
  },
  {
    country: {
      name: "Tab. Trajenta Duo 2.5/500"
    }
  },
  {
    country: {
      name: "Tab. Trajenta Duo 2.5/850"
    }
  },
  {
    country: {
      name: "Tab. Tribet 1"
    }
  },
  {
    country: {
      name: "Tab. Tribet 2"
    }
  },
  {
    country: {
      name: "Tab. Tribetrol"
    }
  },
  {
    country: {
      name: "Tab. Tribetrol 1 Forte"
    }
  },
  {
    country: {
      name: "Tab. Tribetrol 2"
    }
  },
  {
    country: {
      name: "Tab. Tribetrol 2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Tribetrol forte"
    }
  },
  {
    country: {
      name: "Tab. Triblend VG 2"
    }
  },
  {
    country: {
      name: "Tab. Triblend Vg1"
    }
  },
  {
    country: {
      name: "Tab. Tribose M 500 /0.2"
    }
  },
  {
    country: {
      name: "Tab. Tricheck gm p1"
    }
  },
  {
    country: {
      name: "Tab. Tricyblex 60"
    }
  },
  {
    country: {
      name: "Tab. Triexer 2"
    }
  },
  {
    country: {
      name: "Tab. Triglemestar 1"
    }
  },
  {
    country: {
      name: "Tab. Triglimestar 1"
    }
  },
  {
    country: {
      name: "Tab. Triglimicure 2"
    }
  },
  {
    country: {
      name: "Tab. Triglimigem 2"
    }
  },
  {
    country: {
      name: "Tab. Triglimilife 2"
    }
  },
  {
    country: {
      name: "Tab. Triglimisave 1"
    }
  },
  {
    country: {
      name: "Tab. Triglimisave 1 HS"
    }
  },
  {
    country: {
      name: "Tab. Triglimisave 2"
    }
  },
  {
    country: {
      name: "Tab. Triglimisave 2 HS"
    }
  },
  {
    country: {
      name: "Tab. Triglimisave LS"
    }
  },
  {
    country: {
      name: "Tab. Triglimisave LS 1"
    }
  },
  {
    country: {
      name: "Tab. Triglimisave LS 2"
    }
  },
  {
    country: {
      name: "Tab. Triglimisave LS 2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Triglimisave LS Forte 1"
    }
  },
  {
    country: {
      name: "Tab. Triglimisave LS forte 2"
    }
  },
  {
    country: {
      name: "Tab. Triglimisave Ls 2 mg"
    }
  },
  {
    country: {
      name: "Tab. Triglimisave Ls Forte"
    }
  },
  {
    country: {
      name: "Tab. Triglimisave SR"
    }
  },
  {
    country: {
      name: "Tab. Triglucoredforte"
    }
  },
  {
    country: {
      name: "Tab. Triglycomet"
    }
  },
  {
    country: {
      name: "Tab. Triglynase 1"
    }
  },
  {
    country: {
      name: "Tab. Triglynase 2"
    }
  },
  {
    country: {
      name: "Tab. Trimetaday 2"
    }
  },
  {
    country: {
      name: "Tab. Trimetride 2 mg"
    }
  },
  {
    country: {
      name: "Tab. Triobimet 1"
    }
  },
  {
    country: {
      name: "Tab. Triposmeal 1"
    }
  },
  {
    country: {
      name: "Tab. Triposmeal 2"
    }
  },
  {
    country: {
      name: "Tab. Tripride 1"
    }
  },
  {
    country: {
      name: "Tab. Tripride 2"
    }
  },
  {
    country: {
      name: "Tab. Trivoglitor 1"
    }
  },
  {
    country: {
      name: "Tab. Trivoglitor 2"
    }
  },
  {
    country: {
      name: "Tab. Trivoglitor forte 2/0.3/500"
    }
  },
  {
    country: {
      name: "Tab. Trivogo 1"
    }
  },
  {
    country: {
      name: "Tab. Trivogo 1/0.2"
    }
  },
  {
    country: {
      name: "Tab. Trivogo 2"
    }
  },
  {
    country: {
      name: "Tab. Trivogo 2/0.2"
    }
  },
  {
    country: {
      name: "Tab. Trivolib 1"
    }
  },
  {
    country: {
      name: "Tab. Trivolib 2"
    }
  },
  {
    country: {
      name: "Tab. Trivolib Forte"
    }
  },
  {
    country: {
      name: "Tab. Trivolib Forte 1"
    }
  },
  {
    country: {
      name: "Tab. Trivolib Forte 2"
    }
  },
  {
    country: {
      name: "Tab. Trivolib1"
    }
  },
  {
    country: {
      name: "Tab. Trizoryl 1"
    }
  },
  {
    country: {
      name: "inj. Trulicity 1.5"
    }
  },
  {
    country: {
      name: "Inj. Trulicity 1.5"
    }
  },
  {
    country: {
      name: "Tab. Vasupride VG2"
    }
  },
  {
    country: {
      name: "Tab. Vedapride M1"
    }
  },
  {
    country: {
      name: "Inj. Victoza 0.6"
    }
  },
  {
    country: {
      name: "Inj. Victoza 1.2"
    }
  },
  {
    country: {
      name: "Inj. Victoza 1.8"
    }
  },
  {
    country: {
      name: "Tab. Vidzid Xr 60"
    }
  },
  {
    country: {
      name: "Tab. Vigocil"
    }
  },
  {
    country: {
      name: "Tab. Vigocil 0.2"
    }
  },
  {
    country: {
      name: "Tab. Vigocil 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vildagliptin"
    }
  },
  {
    country: {
      name: "Tab. Vildagliptin 50"
    }
  },
  {
    country: {
      name: "Tab. Vildagliptin 50/500"
    }
  },
  {
    country: {
      name: "Tab. Vildagliptin M 50/500"
    }
  },
  {
    country: {
      name: "Tab. Vincomo plus"
    }
  },
  {
    country: {
      name: "Tab. Vingose 0.2"
    }
  },
  {
    country: {
      name: "Tab. Vingose 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vingose met 0.2/500"
    }
  },
  {
    country: {
      name: "Tab. Vingose met 0.3/500"
    }
  },
  {
    country: {
      name: "Tab. Vinicor XL H 50/12.5"
    }
  },
  {
    country: {
      name: "Tab. Viprotein"
    }
  },
  {
    country: {
      name: "Syr. Viscodyne"
    }
  },
  {
    country: {
      name: "Tab. Vision health with lutein"
    }
  },
  {
    country: {
      name: "Tab. Vit d 50 K"
    }
  },
  {
    country: {
      name: "Tab. Vobit 0.2"
    }
  },
  {
    country: {
      name: "Tab. Vobit 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vobit M 0.2"
    }
  },
  {
    country: {
      name: "Tab. Vobit M 0.2/500"
    }
  },
  {
    country: {
      name: "Tab. Vobit M 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vobit M 0.3/500"
    }
  },
  {
    country: {
      name: "Tab. Vobit MD 0.2"
    }
  },
  {
    country: {
      name: "Tab. Vobit MD 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vobose 0.2"
    }
  },
  {
    country: {
      name: "Tab. Vobose 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vobose M"
    }
  },
  {
    country: {
      name: "Tab. Vobose M 0.2 /500"
    }
  },
  {
    country: {
      name: "Tab. Vobose M 0.3 /500"
    }
  },
  {
    country: {
      name: "Tab. Vofid 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vogipax Mp 275"
    }
  },
  {
    country: {
      name: "Tab. Vogistar GM2"
    }
  },
  {
    country: {
      name: "Tab. Vogli 0.2"
    }
  },
  {
    country: {
      name: "Tab. Vogli 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vogli M"
    }
  },
  {
    country: {
      name: "Tab. Vogli M 0.2 /500"
    }
  },
  {
    country: {
      name: "Tab. Vogli M 0.3 /500"
    }
  },
  {
    country: {
      name: "Tab. Vogli Rapid 0.3/1"
    }
  },
  {
    country: {
      name: "Tab. Vogli Tri 0.2/500/40"
    }
  },
  {
    country: {
      name: "Tab. Vogli gm2 forte"
    }
  },
  {
    country: {
      name: "Tab. Vogli-rapid"
    }
  },
  {
    country: {
      name: "tab.vogli 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglibite 0.3mg"
    }
  },
  {
    country: {
      name: "Tab. Voglibite GM 1"
    }
  },
  {
    country: {
      name: "Tab. Voglibite GM 2"
    }
  },
  {
    country: {
      name: "Tab. Voglibite M 0.2"
    }
  },
  {
    country: {
      name: "Tab. Voglibite M 0.3/500"
    }
  },
  {
    country: {
      name: "Tab. Voglibose 0.2"
    }
  },
  {
    country: {
      name: "Tab. Voglibose 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vogliboz 0.2"
    }
  },
  {
    country: {
      name: "Tab. Vogliboz 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vogliboz GM 3"
    }
  },
  {
    country: {
      name: "Tab. Voglichew 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglidib 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglikem 0.2"
    }
  },
  {
    country: {
      name: "Tab. Voglikem 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglikem M 0.2 Forte (1000 )"
    }
  },
  {
    country: {
      name: "Tab. Voglikem M 0.2/500"
    }
  },
  {
    country: {
      name: "Tab. Voglikem M 0.3/500"
    }
  },
  {
    country: {
      name: "Tab. Voglimac 0.2"
    }
  },
  {
    country: {
      name: "Tab. Voglimac 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglimac GM 2"
    }
  },
  {
    country: {
      name: "Tab. Voglimac MF 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglimeal MR 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglimet 0.2"
    }
  },
  {
    country: {
      name: "Tab. Voglimet 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglimet 500"
    }
  },
  {
    country: {
      name: "Tab. Voglimet GM"
    }
  },
  {
    country: {
      name: "Tab. Voglinorm 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglinorm GM 1"
    }
  },
  {
    country: {
      name: "Tab. Voglinorm GM 2"
    }
  },
  {
    country: {
      name: "Tab. Voglirapid 0.3/1.0"
    }
  },
  {
    country: {
      name: "Tab. Voglispan 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglistar"
    }
  },
  {
    country: {
      name: "Tab. Voglistar GM 2"
    }
  },
  {
    country: {
      name: "Tab. Voglistar GM1"
    }
  },
  {
    country: {
      name: "Tab. Voglistar MD 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglitab 0.2"
    }
  },
  {
    country: {
      name: "Tab. Voglitab 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglitab M 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglitor 0.2"
    }
  },
  {
    country: {
      name: "Tab. Voglitor 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglitor 100"
    }
  },
  {
    country: {
      name: "Tab. Voglitor M (0.2+500)"
    }
  },
  {
    country: {
      name: "Tab. Voglitor M (0.2/500)"
    }
  },
  {
    country: {
      name: "Tab. Voglitor MD 0.2"
    }
  },
  {
    country: {
      name: "Tab. Voglitor MF 0.2/500"
    }
  },
  {
    country: {
      name: "Tab. Voglitor MF forte 0.2"
    }
  },
  {
    country: {
      name: "Tab. Voglitor MF0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglitov 0.2"
    }
  },
  {
    country: {
      name: "Tab. Voglitov 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglitrio 0.2"
    }
  },
  {
    country: {
      name: "Tab. Vogliwok 0.2"
    }
  },
  {
    country: {
      name: "Tab. Vogliwok 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglix Trio 2"
    }
  },
  {
    country: {
      name: "Tab. Vogloyd 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voglyson"
    }
  },
  {
    country: {
      name: "Tab. Vogo 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vogo 0.2"
    }
  },
  {
    country: {
      name: "Tab. Vogs 0.2"
    }
  },
  {
    country: {
      name: "Tab. Vogs 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vogs GM"
    }
  },
  {
    country: {
      name: "Tab. Vogs GM 2"
    }
  },
  {
    country: {
      name: "Tab. Vogs M 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vokem MF"
    }
  },
  {
    country: {
      name: "Tab. Vokem MF 3"
    }
  },
  {
    country: {
      name: "Tab. Volibo"
    }
  },
  {
    country: {
      name: "Tab. Volibo -M 0.3 /500"
    }
  },
  {
    country: {
      name: "Tab. Volibo 0.2"
    }
  },
  {
    country: {
      name: "Tab. Volibo 0.3"
    }
  },
  {
    country: {
      name: "Tab. Volibo M 0.2/500"
    }
  },
  {
    country: {
      name: "Tab. Volicure M 0.3"
    }
  },
  {
    country: {
      name: "Tab. Volicure Trio 1 mg"
    }
  },
  {
    country: {
      name: "Tab. Volicure Trio 2 mg"
    }
  },
  {
    country: {
      name: "Tab. Voliphage"
    }
  },
  {
    country: {
      name: "Tab. Voliphage 0.2"
    }
  },
  {
    country: {
      name: "Tab. Voliphage 0.3"
    }
  },
  {
    country: {
      name: "Tab. Voliphage-M 0.2/500"
    }
  },
  {
    country: {
      name: "Tab. Voliphage-M 0.3/500"
    }
  },
  {
    country: {
      name: "Tab. Volix 0.2"
    }
  },
  {
    country: {
      name: "Tab. Volix 0.3"
    }
  },
  {
    country: {
      name: "Tab. Volix M 0.2"
    }
  },
  {
    country: {
      name: "Tab. Volix M 0.2/500"
    }
  },
  {
    country: {
      name: "Tab. Volix M 0.3/500"
    }
  },
  {
    country: {
      name: "Tab. Volix trio"
    }
  },
  {
    country: {
      name: "Tab. Volix trio -1 0.2 /500/1"
    }
  },
  {
    country: {
      name: "Tab. Volix trio -2 0.2 /500/2"
    }
  },
  {
    country: {
      name: "Tab. Volix trio 1"
    }
  },
  {
    country: {
      name: "Tab. Volix trio 2"
    }
  },
  {
    country: {
      name: "Tab. Volmet Trio"
    }
  },
  {
    country: {
      name: "Tab. Volta Neuran DN"
    }
  },
  {
    country: {
      name: "Tab. Voltaflam 50"
    }
  },
  {
    country: {
      name: "Tab. Vose 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vozuca 0.2"
    }
  },
  {
    country: {
      name: "Tab. Vozuca M 0.2"
    }
  },
  {
    country: {
      name: "Tab. Vozuca - M activ 60s 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vozuca 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vozuca M 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vozuca M activ 60s 0.2"
    }
  },
  {
    country: {
      name: "Tab. Vozuca active 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vozuka Active 0.3"
    }
  },
  {
    country: {
      name: "Tab. Vysom M50/500"
    }
  },
  {
    country: {
      name: "Tab. Vysov 50"
    }
  },
  {
    country: {
      name: "Tab. Vysov M 50/1000"
    }
  },
  {
    country: {
      name: "Tab. Vysov M 50/500"
    }
  },
  {
    country: {
      name: "Tab. Vysov M 50/850"
    }
  },
  {
    country: {
      name: "Tab. Walaphage 500"
    }
  },
  {
    country: {
      name: "Tab. Walaphage 850"
    }
  },
  {
    country: {
      name: "Tab. Walaphage GP"
    }
  },
  {
    country: {
      name: "Tab. Walaphage GP 1"
    }
  },
  {
    country: {
      name: "Tab. Walaphage GP 2"
    }
  },
  {
    country: {
      name: "Tab. Walformin 500"
    }
  },
  {
    country: {
      name: "Tab. Walformin 80/500"
    }
  },
  {
    country: {
      name: "Tab. Wheatgrass pill"
    }
  },
  {
    country: {
      name: "Tab. X met 250"
    }
  },
  {
    country: {
      name: "Tab. Xigduo"
    }
  },
  {
    country: {
      name: "Inj. Xigduo 5 mg/1,000"
    }
  },
  {
    country: {
      name: "Tab. Xigduo 5 mg/1,000"
    }
  },
  {
    country: {
      name: "Tab. Xigduo XR 10 / 500"
    }
  },
  {
    country: {
      name: "Tab. Xigduo XR 10/1000"
    }
  },
  {
    country: {
      name: "Tab. Xilia 2"
    }
  },
  {
    country: {
      name: "Tab. Xilia M1"
    }
  },
  {
    country: {
      name: "Tab. Xilia M2"
    }
  },
  {
    country: {
      name: "Tab. Xmet"
    }
  },
  {
    country: {
      name: "Tab. Xmet 250"
    }
  },
  {
    country: {
      name: "Tab. Xmet SR 500"
    }
  },
  {
    country: {
      name: "Tab. Xmet Trio"
    }
  },
  {
    country: {
      name: "Tab. Xmet Trio 2"
    }
  },
  {
    country: {
      name: "Tab. Zarbose M 0.3"
    }
  },
  {
    country: {
      name: "Tab. Zebose 3M"
    }
  },
  {
    country: {
      name: "Tab. Zemiglo 50"
    }
  },
  {
    country: {
      name: "Tab. Zeptin M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Zeptin M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Zicla M"
    }
  },
  {
    country: {
      name: "Tab. Zicron 40"
    }
  },
  {
    country: {
      name: "Tab. Zidmet Forte"
    }
  },
  {
    country: {
      name: "Tab. Ziglim 1"
    }
  },
  {
    country: {
      name: "Tab. Ziglim 2"
    }
  },
  {
    country: {
      name: "Tab. Ziglim M 1"
    }
  },
  {
    country: {
      name: "Tab. Ziglim M2"
    }
  },
  {
    country: {
      name: "Tab. Zilenta"
    }
  },
  {
    country: {
      name: "Tab. Zilenta 20"
    }
  },
  {
    country: {
      name: "Tab. Zilenta M"
    }
  },
  {
    country: {
      name: "Tab. Zilenta M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Zilenta M forte"
    }
  },
  {
    country: {
      name: "Tab. Zita 100"
    }
  },
  {
    country: {
      name: "Tab. Zita 20"
    }
  },
  {
    country: {
      name: "Tab. Zita 50"
    }
  },
  {
    country: {
      name: "Tab. Zita Plus 100"
    }
  },
  {
    country: {
      name: "Tab. Zita plus"
    }
  },
  {
    country: {
      name: "Tab. Zita plus 20"
    }
  },
  {
    country: {
      name: "Tab. Zita plus 20/1000"
    }
  },
  {
    country: {
      name: "Tab. ZitaMet MR 60"
    }
  },
  {
    country: {
      name: "Tab. Zitamet 50/500"
    }
  },
  {
    country: {
      name: "Tab. Zitamet PLus"
    }
  },
  {
    country: {
      name: "Tab. Zitamet plus (20/500)"
    }
  },
  {
    country: {
      name: "Tab. Zitamet plus 20/1000"
    }
  },
  {
    country: {
      name: "Tab. Zitamet plus 20/500"
    }
  },
  {
    country: {
      name: "Tab. Zitaplus 20"
    }
  },
  {
    country: {
      name: "Tab. Ziten"
    }
  },
  {
    country: {
      name: "Tab. Ziten 10"
    }
  },
  {
    country: {
      name: "Tab. Ziten 20"
    }
  },
  {
    country: {
      name: "Tab. Ziten M 20/1000"
    }
  },
  {
    country: {
      name: "Tab. Ziten M 20/500"
    }
  },
  {
    country: {
      name: "Tab. Ziten m"
    }
  },
  {
    country: {
      name: "Tab. Zoform 500 SR"
    }
  },
  {
    country: {
      name: "Tab. Zomelis"
    }
  },
  {
    country: {
      name: "Tab. Zomelis 50"
    }
  },
  {
    country: {
      name: "Tab. Zomelis Met 50"
    }
  },
  {
    country: {
      name: "Tab. Zomelis met 50/1000"
    }
  },
  {
    country: {
      name: "Tab. Zomelis met 50/500"
    }
  },
  {
    country: {
      name: "Tab. Zomet SR 1000"
    }
  },
  {
    country: {
      name: "Tab. Zomet SR 500"
    }
  },
  {
    country: {
      name: "Tab. Zorbten MF 1000"
    }
  },
  {
    country: {
      name: "Tab. Zorly M3"
    }
  },
  {
    country: {
      name: "Tab. Zorly MF 3/850"
    }
  },
  {
    country: {
      name: "Tab. Zoryl 0.5"
    }
  },
  {
    country: {
      name: "Tab. Zoryl 1"
    }
  },
  {
    country: {
      name: "Tab. Zoryl 2"
    }
  },
  {
    country: {
      name: "Tab. Zoryl 3"
    }
  },
  {
    country: {
      name: "Tab. Zoryl 4"
    }
  },
  {
    country: {
      name: "Tab. Zoryl M 0.5"
    }
  },
  {
    country: {
      name: "Tab. Zoryl M 1 Forte"
    }
  },
  {
    country: {
      name: "Tab. Zoryl M 2"
    }
  },
  {
    country: {
      name: "Tab. Zoryl M 2 forte"
    }
  },
  {
    country: {
      name: "Tab. Zoryl M 3 Forte"
    }
  },
  {
    country: {
      name: "Tab. Zoryl M 4 Forte"
    }
  },
  {
    country: {
      name: "Tab. Zoryl M1"
    }
  },
  {
    country: {
      name: "Tab. Zoryl M2 Forte"
    }
  },
  {
    country: {
      name: "Tab. Zoryl M3"
    }
  },
  {
    country: {
      name: "Tab. Zoryl M4"
    }
  },
  {
    country: {
      name: "Tab. Zoryl M4"
    }
  },
  {
    country: {
      name: "Tab. Zoryl MF 3/850"
    }
  },
  {
    country: {
      name: "Tab. Zoryl MP 1"
    }
  },
  {
    country: {
      name: "Tab. Zoryl MP 2"
    }
  },
  {
    country: {
      name: "Tab. Zoryl MV1"
    }
  },
  {
    country: {
      name: "Tab. Zoryl MV2"
    }
  },
  {
    country: {
      name: "Tab. Zurig 40"
    }
  },
  {
    country: {
      name: "Tab. Zuvog M 0.2"
    }
  },
  {
    country: {
      name: "Tab. citapen 500"
    }
  },
  {
    country: {
      name: "Tab. gibtulio 25 mg"
    }
  },
  {
    country: {
      name: "Tab. glimepiride sandoz 2"
    }
  },
  {
    country: {
      name: "Inj. mixtard 30/30"
    }
  },
  {
    country: {
      name: "Tab. pioz MF 15/500"
    }
  },
  {
    country: {
      name: "Tab. semi daonil 2.5"
    }
  },
  {
    country: {
      name: "Tab. tripride 2"
    }
  },
  {
    country: {
      name: "Tab. zeformin XR 60"
    }
  }
]
var screen = Dimensions.get('window');
export default class AddModal extends Component {
  state = {
    expoPushToken: '',
    notification: {},
  };

  componentWillReceiveProps({ data }) {
    this.setState({ data });
  }

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      console.log(token.data);
      this.setState({ expoPushToken: token.data });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addNotificationResponseReceivedListener(
      this._handleNotification
    );
	
  }

  _handleNotification = notification => {
    Vibration.vibrate()
    this.setState({ notification: notification });
  };

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
  sendPushNotification = async () => {
    const message = {
      to: this.state.expoPushToken,
      sound: 'default',
      title: 'Recommended a New Medicine',
      body: 'You Have New Medicine Added',
      data: { data: 'Your Medicine Has been Changed' },
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    const data = response._bodyInit;
    console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
  };


  constructor(props) {
    super(props);
    this.state = {
      newFoodName: '',
      newFoodDescription: '',
      newFoodDescription1: '',
      newFoodDescription2: '',
      newFoodDescription3: '',
      language: '',
      country: '',
      newDosage: '',

    };

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
  }

  showAddModal = () => {
    this.refs.myModal.open();
  }
  generateKey = (numberOfCharacters) => {
    return require('random-string')({ length: numberOfCharacters });
  }
  render() {





    return (
      <Modal
        ref={"myModal"}
        style={{
          justifyContent: 'center',
          borderRadius: Platform.OS === 'ios' ? 30 : 0,
          shadowRadius: 10,
          width: screen.width - 30,
          height: 430
        }}
        position='center'
        backdrop={true}
        onClosed={() => {
          // alert("Modal closed");
        }}
      >
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 20
        }}> New Medicine </Text>

        <SafeAreaView>
          <AutoComplete
            onSelect={data => this.setState({ country: data.country.name })}
            dataSource={countries}
            value={this.state.country}
            textLabel="Select Medicine"
            searchPlaceholder='Search Medicine'
            cancelText="Close"
            searchField="country.name"

          />

        </SafeAreaView>
        <View style={{ flexDirection: "row" }}>

          <View style={{ flex: 1 }}>
            <TextInput
              style={{
                height: 40,
                width: '60%',
                borderBottomColor: 'gray',
                marginLeft: 120,
                marginRight: 30,
                marginTop: 10,
                marginBottom: 20,
                borderBottomWidth: 1,
                justifyContent: 'flex-start',
                alignSelf: 'flex-start',
                textAlign: 'center'
              }} keyboardType={'numeric'}
              maxLength={3}

              onChangeText={(text) => this.setState({ newFoodDescription: text })}
              placeholder="M"
              value={this.state.newFoodDescription}
            />
          </View>

          <View style={{ flex: 1 }}>
            <TextInput
              style={{
                height: 40,
                width: '70%',
                borderBottomColor: 'gray',
                marginLeft: 120,
                marginRight: 30,
                marginTop: 10,
                marginBottom: 20,
                borderBottomWidth: 1,
                justifyContent: 'flex-end',
                textAlign: 'center'
              }} keyboardType={'numeric'}

              onChangeText={(text) => this.setState({ newFoodDescription1: text })}
              placeholder="A"
              value={this.state.newFoodDescription1}
            />
          </View>
          <View style={{ flex: 1, }}>
            <TextInput
              style={{
                height: 40,
                width: '80%',
                borderBottomColor: 'gray',
                marginLeft: 120,
                marginRight: 30,
                marginTop: 10,
                marginBottom: 20,
                borderBottomWidth: 1,
                justifyContent: 'flex-start',
                textAlign: 'center'
              }} keyboardType={'numeric'}

              onChangeText={(text) => this.setState({ newFoodDescription2: text })}
              placeholder="N"
              value={this.state.newFoodDescription2}
            />
          </View>

          <View style={{ flex: 2, flexDirection: 'column' }}>
            <TextInput
              style={{
                height: 40,
                width: '100%',
                borderBottomColor: 'gray',
                marginLeft: -30,
                marginRight: 10,
                marginTop: 85,
                marginBottom: 20,
                borderBottomWidth: 1,
                alignItems: 'flex-start',
                textAlign: 'center'

              }} keyboardType={'numeric'}

              onChangeText={(text) => this.setState({ newFoodDescription3: text })}
              placeholder="Time"
              value={this.state.newFoodDescription3}
            />
          </View>

          <View style={{
            flex: 2,
            flexDirection: 'column',
            justifyContent: 'space-around',

          }}>
            <Picker
              selectedValue={this.state.language}
              style={{
                alignItems: 'flex-start',
                alignSelf: 'flex-start', marginTop: 10, marginLeft: 10, marginRight: 10, height: 30, width: 130
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ language: itemValue })
              }>
              <Picker.Item label="Duration" value="Duration" />
              <Picker.Item label="Days" value="Days" />
              <Picker.Item label="Weeks" value="Weeks" />
              <Picker.Item label="Months" value="Months" />
            </Picker>
          </View>




          <Button
            style={{ fontSize: 18, color: 'white' }}
            containerStyle={{
              flex: 3,
              flexDirection: 'column-reverse',
              padding: 8,
              marginTop: 180,
              marginLeft: -150,
              marginRight: 120,
              height: 40,
              borderRadius: 6,
              backgroundColor: '#00b8ff',
              alignItems: 'center',
              alignSelf: 'center'

            }}

            onPress={() => {
              if (this.state.newFoodDescription.length == 0 || this.state.newDosage.lenght == 0) {
                alert("You must enter medicine's name and dosage");
                return;
              }
              const newKey = this.generateKey(24);
              const newFood = {
                key: newKey,
                name: this.state.foodName,
                country: this.state.country,
                foodDescription: this.state.newFoodDescription,
                foodDescription1: this.state.newFoodDescription1,
                foodDescription2: this.state.newFoodDescription2,
                foodDescription3: this.state.newFoodDescription3,
                itemValue: this.state.language,
                dosages: this.state.newDosage,
                handleSelectItem: this.state.newitem,
              };
              flatListData.push(newFood);
              this.props.parentFlatList.refreshFlatList(newKey);
              this.refs.myModal.close();
              this.sendPushNotification()
            }}>
            Save
                </Button>

        </View>

      </Modal >
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

