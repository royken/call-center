export class AchatData {

  jour: number;

  qteBi: number;

  qteBg: number;

  qtePet: number;

  chiffreAffaire: number;

  produits: String;

  constructor () {
      this.qteBi = 0;
      this.qteBg = 0;
      this.qtePet = 0;
      this.chiffreAffaire = 0;
      this.produits = "";
  }

  addBi(qteBi: number){
      this.qteBi += qteBi;
  }

  addBg(qteBg: number){
      this.qteBg += qteBg;
  }

  addPet(qtePet: number){
      this.qtePet += qtePet;
  }

  addCA(chiffreAffaire: number){
      this.chiffreAffaire += chiffreAffaire;
  }

  addProduit(produit: String){
      this.produits += produit + " , ";
  }


}
