import React, { useEffect, useState } from 'react';
import { FaDollarSign, FaHome, FaCarBattery, FaRegUser, FaRegCalendarAlt, FaRegClock } from 'react-icons/fa'
import {
  Button, ButtonOutline, Input, OnlyNumbers, Dinheiro,
  Kilos, TextArea, AutoComplete, AutoCompleteAdd, Data, Hora, Alerta, AlertaContainer,
  AcordeaoVenda, TimeLineContent,Timeline,TimelineGrupo
} from './utils/Components'
import '../src/utils/global.css'
//document.body.classList.toggle('dark-mode')
function App() {
  const [value, setValue] = useState('')
  const [data, setData] = useState([])

  return (
    <div style={{ display: "flex", justifyContent: 'center' }}>

      <header className="header">
        <div className="logo">

        </div>
        <li>
          <ul>
            <div>
              <FaHome size={28} />
              <p>Inicio</p>
            </div>
          </ul>
          <ul className="select" >
            <div>
              <FaDollarSign size={28} />
              <p>Financeiro</p>
            </div>
          </ul>
          <ul>
            <div>
              <FaCarBattery size={28} />
              <p>Produtos</p>
            </div>
          </ul>
        </li>
      </header>
      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: 'auto', margin: 20 }}>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: 300, margin: 20 }}>

          <Button
            style={{ margin: 5 }}
            icon={<FaCarBattery />}
            onClick={() => document.body.classList.toggle('dark-mode')} >
            Light/Dark
</Button>


          <Input
            required
            icon={<FaRegUser />}
            placeholder="Digite seu nome"
          />
          <OnlyNumbers
            icon={<FaDollarSign />}
            placeholder="Somente numeros"
          />
          <Dinheiro
            placeholder="Dinheiro"
            onChange={(value) => console.log(value.target.value)}
          />
          <Kilos
            placeholder="Kilos"
            onChange={(value) => console.log(value.target.value)}
          />
          <ButtonOutline
            icon={<FaCarBattery />}>
            Enviar
</ButtonOutline>
          <TextArea
            placeholder="Digite seu texto..."
          >
          </TextArea>
          <AutoComplete
            selectedValue={(e) => setValue(e)}
            data={[
              { line1: 'F22MPD', line2: '60AH', disabled: false },
              { line1: 'F22AD', line2: '60AH', disabled: false },
              { line1: 'F18PL', line2: '46AH', disabled: false },
              { line1: 'F16PL', line2: '40AH', disabled: true },
              { line1: 'F20PD', line2: '50AH', disabled: false },
              { line1: 'F19MPD', line2: '50AH', disabled: false },
              { line1: 'F26PS', line2: '70AH', disabled: false }
            ]}
            required
            icon={<FaDollarSign />}
            placeholder="Digite seu nome"
          />
          <AutoCompleteAdd
            selectedValue={(e) => setValue(e)}
            data={[
              { line1: 'F22MPD', disabled: false },
              { line1: 'F22AD', disabled: false },
              { line1: 'F18PL', disabled: false }
            ]}
            required
            icon={<FaDollarSign />}
            placeholder="Digite seu nome"
          />
          <Data
            required
            icon={<FaRegCalendarAlt />}
            placeholder="Digite seu nome"
          />
          <Hora
            required
            icon={<FaRegClock />}
            placeholder="Digite seu nome"
          />

          <Button onClick={() => setData([...data, { msg: new Date().toString(), code: 400 }])} >Mostrar Snack de Erro</Button>
          <Button onClick={() => setData([...data, { msg: new Date().toString(), code: 200 }])} >Mostrar Snack de Sucesso</Button>

          <AlertaContainer>
            {data.map((e, index) => { return <Alerta key={index} data={e} /> })}
          </AlertaContainer>


        </div>
        <div style={{ width: 800 }}>
          <AcordeaoVenda
            data={{
              id:2,
              data: '03/10/2018',
              lancado: '05/10/2019 ás 15:30h por Yasmim',
              pedido: 340,
              peso: 245.6,
              quantidade: 14,
              valor: 3449.34,
              produtos: [
                {
                  id: 3,
                  produto: 'produto'
                }
              ]
            }}
          />
          <Timeline>
            <TimelineGrupo data={{ data: '23/10/1997', valor: 2000 }}>
              <TimeLineContent
                data={[{
                  id:1,
                  data: '03/10/2018',
                  lancado: '05/10/2019 ás 15:30h por Yasmim',
                  pedido: 340,
                  peso: 245.6,
                  quantidade: 14,
                  valor: 3449.34,
                  produtos: [
                    {
                      id: 3,
                      produto: 'produto'
                    }
                  ]
                }]}
              />
            </TimelineGrupo>
          </Timeline>
          


        </div>

      </div>

    </div>
  );
}

export default App;
