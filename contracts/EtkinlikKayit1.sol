// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EtkinlikKayit1 {

    string public etkinlikAdi = "Blockchain Egitim Etkinligi";

    mapping(address => string) public takmaAdlar;

    function takmaAdKaydet(string memory _takmaAd) public {
        takmaAdlar[msg.sender] = _takmaAd;
    }
}