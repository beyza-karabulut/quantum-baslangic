// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EtkinlikKayit2 {

    string public etkinlikAdi = "Blockchain Egitim Etkinligi";

    uint256 public constant KAPASITE = 3;
    uint256 public toplamKayit = 0;

    mapping(address => string) public takmaAdlar;
    mapping(address => bool) public kayitliMi;

    function takmaAdKaydet(string memory _takmaAd) public {
        require(bytes(_takmaAd).length > 0, "Takma ad bos olamaz");
        require(!kayitliMi[msg.sender], "Bu adres zaten kayitli");
        require(toplamKayit < KAPASITE, "Etkinlik kapasitesi dolu");

        takmaAdlar[msg.sender] = _takmaAd;
        kayitliMi[msg.sender] = true;

        toplamKayit++;
    }
}