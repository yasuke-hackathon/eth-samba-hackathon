import React, { useState } from 'react';
import Web3 from 'web3';

interface WindowWithEthereum extends Window {
    ethereum?: any;
}

declare const window: WindowWithEthereum;

const ContractInteractionComponent: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [artist, setArtist] = useState<string>('');
    const [album, setAlbum] = useState<string>('');
    const [isrc, setISRC] = useState<string>('');
    const [interactionResult, setInteractionResult] = useState<string | null>(null);
    const [registeredISRCs, setRegisteredISRCs] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const interactWithContract = async () => {
        setIsLoading(true);
        // Conectar ao provedor Web3 (por exemplo, MetaMask)
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
                // Solicitar acesso à carteira do usuário
                await window.ethereum.enable();

                // Contrato inteligente ABI (interface do contrato)
                const abi = [
                    {
                        "inputs": [
                            {
                                "internalType": "string",
                                "name": "isrc",
                                "type": "string"
                            }
                        ],
                        "name": "addISRC",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "anonymous": false,
                        "inputs": [
                            {
                                "indexed": false,
                                "internalType": "string",
                                "name": "isrc",
                                "type": "string"
                            }
                        ],
                        "name": "ISRCAdded",
                        "type": "event"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "string",
                                "name": "isrc",
                                "type": "string"
                            }
                        ],
                        "name": "isISRCRegistered",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "string",
                                "name": "isrc",
                                "type": "string"
                            }
                        ],
                        "name": "validateISRC",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    }
                ]; // Cole o ABI do seu contrato aqui

                // Endereço do contrato inteligente
                const contractAddress = '0x08026953eB3c4c0F72650b632E51c36D1e550230'; // Coloque o endereço do seu contrato aqui

                // Instanciar o contrato inteligente
                const contract = new web3.eth.Contract(abi, contractAddress);

                // Chamar uma função do contrato (por exemplo, adicionar um ISRC)
                const accounts = await web3.eth.getAccounts(); // Obter contas disponíveis
                await contract.methods.addISRC(isrc).send({ from: accounts[0] }); // Usar a primeira conta disponível como remetente

                // Atualizar lista de ISRCs registrados
                const isrcs = await contract.methods.getAllRegisteredISRCs().call();
                setRegisteredISRCs(isrcs);

                setInteractionResult('ISRC adicionado com sucesso!');
            } catch (error) {
                console.error('Erro ao interagir com o contrato:', error);
                setInteractionResult('Erro ao interagir com o contrato');
            } finally {
                setIsLoading(false);
            }
        } else {
            console.error('Web3 não detectado. Por favor, instale MetaMask.');
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'artist':
                setArtist(value);
                break;
            case 'album':
                setAlbum(value);
                break;
            case 'isrc':
                setISRC(value);
                break;
            default:
                break;
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
            <h2 style={{ color: '#05D33F' }}>Formulário de Submissão de Música</h2>
            <form>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="title" style={{ color: '#05D33F', marginRight: '0.5rem' }}>Título:</label>
                    <input type="text" id="title" name="title" value={title} onChange={handleInputChange} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #05D33F' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="artist" style={{ color: '#05D33F', marginRight: '0.5rem' }}>Artista:</label>
                    <input type="text" id="artist" name="artist" value={artist} onChange={handleInputChange} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #05D33F' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="album" style={{ color: '#05D33F', marginRight: '0.5rem' }}>Álbum:</label>
                    <input type="text" id="album" name="album" value={album} onChange={handleInputChange} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #05D33F' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="isrc" style={{ color: '#05D33F', marginRight: '0.5rem' }}>ISRC:</label>
                    <input type="text" id="isrc" name="isrc" value={isrc} onChange={handleInputChange} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #05D33F' }} />
                </div>
                <button type="button" onClick={interactWithContract} disabled={isLoading} style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', backgroundColor: '#05D33F', color: '#fff', cursor: 'pointer' }}>
                    {isLoading ? 'Enviando...' : 'Enviar Música'}
                </button>
            </form>
            {interactionResult && <p>{interactionResult}</p>}
            <div>
                <h2 style={{ color: 'white' }}>ISRCs Registrados:</h2>
                <ul>
                    {registeredISRCs.map((isrc, index) => (
                        <li key={index}>{isrc}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ContractInteractionComponent;