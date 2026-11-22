// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EtkinlikKayit3 {

    string public etkinlikAdi = "Blockchain Egitim Etkinligi";

    uint256 public constant KAPASITE = 3;
    uint256 public toplamKayit = 0;

    address public gorevli;

    mapping(address => string) public takmaAdlar;
    mapping(address => bool) public kayitliMi;
    mapping(address => bool) public girisYaptiMi;

    event KatilimciKaydedildi(address indexed katilimci);
    event GirisOnaylandi(address indexed katilimci);

    constructor() {
        gorevli = msg.sender;
    }

    function takmaAdKaydet(string memory _takmaAd) public {
        require(bytes(_takmaAd).length > 0, "Takma ad bos olamaz");
        require(!kayitliMi[msg.sender], "Bu adres zaten kayitli");
        require(toplamKayit < KAPASITE, "Etkinlik kapasitesi dolu");

        takmaAdlar[msg.sender] = _takmaAd;
        kayitliMi[msg.sender] = true;
        toplamKayit++;

        emit KatilimciKaydedildi(msg.sender);
    }

    function girisOnayla(address _katilimci) public {
        require(msg.sender == gorevli, "Yetkisiz gorevli");
        require(kayitliMi[_katilimci], "Katilimci kayitli degil");
        require(!girisYaptiMi[_katilimci], "Giris zaten yapildi");

        girisYaptiMi[_katilimci] = true;

        emit GirisOnaylandi(_katilimci);
    }
}