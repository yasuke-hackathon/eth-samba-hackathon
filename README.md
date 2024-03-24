## Meu Contrato Inteligente

Este contrato inteligente implementa um sistema de registro de músicas, onde os usuários podem adicionar novas músicas à plataforma através do registro do código ISRC (International Standard Recording Code).

- **Endereço do Contrato:** 0x08026953eB3c4c0F72650b632E51c36D1e550230
- **Link para o Contrato no Scroll-Etherscan:** [https://scroll.l2scan.co/address/0x08026953eB3c4c0F72650b632E51c36D1e550230?tab=overview](https://scroll.l2scan.co/address/0x08026953eB3c4c0F72650b632E51c36D1e550230?tab=overview)

Este contrato inteligente permite aos usuários adicionar novas músicas à plataforma através do envio do código ISRC. Os ISRCs registrados podem ser visualizados na seção abaixo do formulário de submissão de músicas.

Claro, aqui estão algumas informações adicionais sobre o contrato e sua utilização:

### Instruções de Uso:

1. **Submissão de Música:**
   - Preencha o formulário com as informações da música, incluindo título, artista, álbum e o código ISRC.
   - Clique no botão "Enviar Música" para interagir com o contrato inteligente e registrar a música na plataforma.

2. **Verificação de ISRC:**
   - Antes de enviar uma música, verifique se o código ISRC é válido utilizando a função "validateISRC" disponível no contrato.

### Detalhes sobre Eventos Emitidos:

O contrato inteligente emite o evento "ISRCAdded" sempre que um novo ISRC é adicionado à plataforma. Esse evento contém o código ISRC da música recém-adicionada.

### Observações Importantes:

- Certifique-se de possuir uma carteira Ethereum conectada à rede Ethereum para interagir com o contrato.
- Sempre verifique se o código ISRC fornecido é válido antes de submeter uma música.