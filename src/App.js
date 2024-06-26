import './App.css'
import { useState } from 'react'
import { create } from 'ipfs-http-client'
import {Buffer} from 'buffer'

const projectId = 'api key here';
const projectSecret = 'api key secret here';
const dedicatedGateway = 'sub-domain here'

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const client = create({
  host: 'ipfs.infura.io',
  //host: '127.0.0.1',
  port: 5001,
  protocol: 'https',
  //protocol: 'http',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
    // 'User-Agent': 'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19'
  }
})
function App() {
  const [fileUrl, updateFileUrl] = useState(``)
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://${dedicatedGateway}.infura-ipfs.io/ipfs/${added.path}`
      updateFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }
  return (
    <div className="App">
      <h1>IPFS Example</h1>
      <input
        type="file"
        onChange={onChange}
      />
      {
        fileUrl && (
          <img src={fileUrl} width="600px" />
        )
      }
    </div>
  );
}
export default App
