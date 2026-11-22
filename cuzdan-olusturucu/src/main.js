
import './style.css'
import { Mnemonic, HDNodeWallet } from 'ethers'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>Eğitim Cüzdanı Oluşturucu</h1>
    <p>Bu uygulama BIP39 ve Ethereum cüzdan oluşturma adımlarını gösterir.</p>

    <button id="createWallet">Yeni Eğitim Cüzdanı Oluştur</button>

    <div id="results" class="results" hidden>
      <h2>Oluşturulan Cüzdan Bilgileri</h2>
      <p id="validation"></p>

      <div class="field">
        <h3>1. Entropy (128 bit)</h3>
        <p id="entropy" class="secret">••••••••••••••••</p>
        <button data-target="entropy">Göster</button>
      </div>

      <div class="field">
        <h3>2. Mnemonic (12 kelime)</h3>
        <p id="mnemonic" class="secret">••••••••••••••••</p>
        <button data-target="mnemonic">Göster</button>
      </div>

      <div class="field">
        <h3>3. Seed</h3>
        <p id="seed" class="secret">••••••••••••••••</p>
        <button data-target="seed">Göster</button>
      </div>

      <div class="field">
        <h3>4. Derivation Path</h3>
        <p>m/44'/60'/0'/0/0</p>
      </div>

      <div class="field">
        <h3>5. Private Key</h3>
        <p id="privateKey" class="secret">••••••••••••••••</p>
        <button data-target="privateKey">Göster</button>
      </div>

      <div class="field">
        <h3>6. Public Key</h3>
        <p id="publicKey"></p>
      </div>

      <div class="field">
        <h3>7. Ethereum Address</h3>
        <p id="address"></p>
      </div>
    </div>
  </div>
`

document.querySelector('#createWallet').addEventListener('click', () => {
  const status = document.querySelector('#validation')
  const entropyBytes = crypto.getRandomValues(new Uint8Array(16))
  const entropy = '0x' + Array.from(entropyBytes, byte =>
    byte.toString(16).padStart(2, '0')
  ).join('')

  const mnemonic = Mnemonic.fromEntropy(entropy)
  status.textContent = Mnemonic.isValidMnemonic(mnemonic.phrase)
  ? 'BIP39 doğrulaması başarılı!'
  : 'BIP39 doğrulaması başarısız!'
  const seed = mnemonic.computeSeed()
  const wallet = HDNodeWallet.fromMnemonic(
    mnemonic,
    "m/44'/60'/0'/0/0"
  )

  document.querySelector('#entropy').textContent = entropy
  document.querySelector('#mnemonic').textContent = mnemonic.phrase
  document.querySelector('#seed').textContent = seed
  document.querySelector('#privateKey').textContent = wallet.privateKey
  document.querySelector('#publicKey').textContent = wallet.signingKey.publicKey
  document.querySelector('#address').textContent = wallet.address

  document.querySelectorAll('[data-target]').forEach(button => {
    button.textContent = 'Göster'
    button.dataset.visible = 'false'
    const target = document.getElementById(button.dataset.target)
    target.classList.add('secret')
  })

  document.querySelector('#results').hidden = false
})

document.querySelectorAll('[data-target]').forEach(button => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.target)
    const visible = button.dataset.visible === 'true'

    target.classList.toggle('secret', visible)
    button.textContent = visible ? 'Göster' : 'Gizle'
    button.dataset.visible = String(!visible)
  })
})
