import React, { useEffect, useState } from 'react';
import { FaCheck, FaRegCheckCircle, FaRegTimesCircle, FaTimes, FaTimesCircle } from 'react-icons/fa'
import NumberFormat from 'react-number-format';
import './components.css'
export function Button(props) {
  return (
    <div
      style={props.style}
      className="button"
      onClick={props.onClick} >
      {props.icon}
      <p>{props.children}</p>
    </div>
  )
}
export function ButtonOutline(props) {
  return (
    <button

      style={props.style}
      className="buttonOutline"
      onClick={props.onClick} >
      {props.icon}
      <p>{props.children}</p>
    </button>
  )
}
export function Input(props) {
  return (
    <div className="input" style={props.style}>
      {props.icon}
      <input
        required={props.required}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
      />
    </div>
  )
}
export function Data(props) {
  return (
    <div className="input" style={props.style}>
      {props.icon}
      <input
        required={props.required}
        type="date"
        required={props.required}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
      />
    </div>
  )
}
export function Hora(props) {
  return (
    <div className="input" style={props.style}>
      {props.icon}
      <input type="time" />
    </div>
  )
}
export function OnlyNumbers(props) {
  return (
    <div className="input" style={props.style}>

      <input
        required={props.required}
        onInput={(value) => value.target.value = value.target.value.replace(/[^\d]/, '')}
        style={{ width: props.width }}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
      />
      <p style={{ marginRight: 5 }}><b>UND</b></p>
    </div>
  )
}
export function Dinheiro(props) {
  return (
    <div className="input" style={props.style}>
      <p style={{ marginRight: 5 }}><b>R$</b></p>
      <NumberFormat
        required={props.required}
        onChange={props.onChange}
        style={{ width: props.width }}
        placeholder={props.placeholder}
        value={props.value}
        decimalScale={2}
        decimalSeparator=","
        thousandSeparator="."
      />
    </div>
  )
}
export function Kilos(props) {
  return (
    <div className="input" style={props.style}>
      <NumberFormat
        required={props.required}
        onChange={props.onChange}
        style={{ width: props.width }}
        placeholder={props.placeholder}
        value={props.value}
        decimalScale={2}
        decimalSeparator=","
        thousandSeparator="."
      />
      <p style={{ marginRight: 5 }}><b>KG</b></p>
    </div>
  )
}
export function TextArea(props) {
  return (
    <div className="input textarea" style={props.style}>
      <textarea
        required={props.required}
        placeholder={props.placeholder}
      >{props.children}</textarea>
    </div>
  )
}
export function AutoComplete(props) {
  const [data] = useState(props.data);
  const [text, setText] = useState(props.value || '')
  const [result, setResult] = useState([])
  const [element, setElement] = useState(null)
  const [selected, setSelected] = useState(null)
  function filter(value) {

    setText(value)
    let rest = data.filter((el) => {
      if (!el.disabled) {
        return el.line1.toUpperCase().indexOf(value.toUpperCase()) > -1 || el.line2.toUpperCase().indexOf(value.toUpperCase()) > -1
      } else {
        return null;
      }
    })

    if (value.trim() !== '') {
      setResult(rest)
      setElement(0)
    } else {
      setResult([])
      setSelected(null)
      setElement(null)
    }
  }
  function objetoList(value, index) {
    return (
      <div className={index === 0 ? "selectAutoComplete autoComplete" : "autoComplete"} key={index}

        onMouseDown={() => {
          setResult([])
          setText(value.line1)
          setSelected(value)
          props.selectedValue(value)
        }
        }>
        <p>{value.line1}</p>
        <p>{value.line2}</p>
      </div>
    )
  }
  function select(e) {
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
    if (e.which === 38) {
      if (element - 1 >= 0) {
        if (document.getElementsByClassName('selectAutoComplete').length > 0) {
          document.getElementsByClassName('selectAutoComplete')[0].setAttribute('class', 'autoComplete')
          document.getElementsByClassName('autoComplete')[element - 1].setAttribute('class', 'autoComplete selectAutoComplete')
          setElement(element - 1)
        }
      } else {
        if (document.getElementsByClassName('selectAutoComplete').length > 0) {
          document.getElementsByClassName('selectAutoComplete')[0].setAttribute('class', 'autoComplete')
          document.getElementsByClassName('autoComplete')[result.length - 1].setAttribute('class', 'autoComplete selectAutoComplete')
          setElement(result.length - 1)
        }
      }

    } else if (e.which === 40) {
      if (element + 1 < result.length) {
        if (document.getElementsByClassName('selectAutoComplete').length > 0) {
          document.getElementsByClassName('selectAutoComplete')[0].setAttribute('class', 'autoComplete')
          document.getElementsByClassName('autoComplete')[element + 1].setAttribute('class', 'autoComplete selectAutoComplete')
          setElement(element + 1)
        }
      } else {
        if (document.getElementsByClassName('selectAutoComplete').length > 0) {
          document.getElementsByClassName('selectAutoComplete')[0].setAttribute('class', 'autoComplete')
          document.getElementsByClassName('autoComplete')[0].setAttribute('class', 'autoComplete selectAutoComplete')
          setElement(0)
        }
      }
    } else if (e.which === 13) {
      if (result[element]) {
        setResult([])
        setText(result[element].line1)
        setSelected(result[element])
        props.selectedValue(result[element])
      }
    }
  }
  return (
    <div className="containerAutoComplete" style={props.style} >
      <div >
        <div className="input" >
          <input
            onChange={(value) => filter(value.target.value)}
            onKeyUp={(value) => select(value)}
            onBlur={() => {
              if (!selected) {
                setText('')
              } else {
                setText(selected.line1)
              }
              setResult([])
            }}
            required={props.required}
            placeholder={props.placeholder}
            value={text}
          />
          {
            selected ?
              <FaTimesCircle
                onClick={() => { setText(''); setSelected(null) }}
              />
              : null
          }

        </div>
        <div className="containerChildren">
          {
            result !== [] ?
              result.map((el, index) => {
                return objetoList(el, index)
              })
              : null
          }
        </div>
      </div>

    </div>

  )
}
export function AutoCompleteAdd(props) {
  const [data] = useState(props.data);
  const [text, setText] = useState(props.value || '')
  const [result, setResult] = useState([])
  const [element, setElement] = useState(null)
  const [selected, setSelected] = useState(null)
  function filter(value) {

    setText(value)
    let rest = data.filter((el) => {
      if (!el.disabled) {
        return el.line1.toUpperCase().indexOf(value.toUpperCase()) > -1
      } else {
        return null;
      }
    })
    if (value.trim() !== '') {
      setResult(rest)
      setElement(0)
    } else {
      setResult([])
      setSelected(null)
      setElement(null)
    }

  }
  function objetoList(value, index) {
    return (
      <div className={index === 0 ? "selectAutoComplete autoComplete" : "autoComplete"} key={index}

        onMouseDown={() => {
          setResult([])
          setText(value.line1)
          setSelected(value)
          props.selectedValue(value)
        }
        }>
        <p>{value.line1}</p>
      </div>
    )
  }
  function select(e) {
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
    if (e.which === 38) {
      if (element - 1 >= 0) {
        if (document.getElementsByClassName('selectAutoComplete').length > 0) {
          document.getElementsByClassName('selectAutoComplete')[0].setAttribute('class', 'autoComplete')
          document.getElementsByClassName('autoComplete')[element - 1].setAttribute('class', 'autoComplete selectAutoComplete')
          setElement(element - 1)
        }
      } else {
        if (document.getElementsByClassName('selectAutoComplete').length > 0) {
          document.getElementsByClassName('selectAutoComplete')[0].setAttribute('class', 'autoComplete')
          document.getElementsByClassName('autoComplete')[result.length - 1].setAttribute('class', 'autoComplete selectAutoComplete')
          setElement(result.length - 1)
        }
      }

    } else if (e.which === 40) {
      if (element + 1 < result.length) {
        if (document.getElementsByClassName('selectAutoComplete').length > 0) {
          document.getElementsByClassName('selectAutoComplete')[0].setAttribute('class', 'autoComplete')
          document.getElementsByClassName('autoComplete')[element + 1].setAttribute('class', 'autoComplete selectAutoComplete')
          setElement(element + 1)
        }
      } else {
        if (document.getElementsByClassName('selectAutoComplete').length > 0) {
          document.getElementsByClassName('selectAutoComplete')[0].setAttribute('class', 'autoComplete')
          document.getElementsByClassName('autoComplete')[0].setAttribute('class', 'autoComplete selectAutoComplete')
          setElement(0)
        }
      }
    } else if (e.which === 13) {
      if (result[element]) {
        setResult([])
        setText(result[element].line1)
        setSelected(result[element])
        props.selectedValue(result[element])
      }
    }
  }
  return (
    <div className="containerAutoComplete" style={props.style} >
      <div >
        <div className="input" >
          <input
            onChange={(value) => filter(value.target.value)}
            onKeyUp={(value) => select(value)}
            onBlur={() => {
              if (!selected) {
                setText('')
              } else {
                setText(selected.line1)
              }
              setResult([])
            }}
            required={props.required}
            placeholder={props.placeholder}
            value={text}
          />
          {
            selected ?
              <FaTimesCircle
                onClick={() => { setText(''); setSelected(null) }}
              />
              : null
          }

        </div>
        <div className="containerChildren">
          {
            result.length > 0 ?
              result.map((el, index) => {
                return objetoList(el, index)
              })
              :
              text !== "" && !selected ?
                <div className="selectAutoComplete autoComplete add"
                  onMouseDown={() => {
                    result.push({ line1: text, line2: text })
                    setText(text)
                    setSelected(result[result.length - 1])
                    props.selectedValue(result[result.length - 1])
                  }}>
                  <p>Adicionar "{text}"</p>
                </div>
                : null
          }

        </div>
      </div>

    </div>

  )
}
export function AcordeaoVenda(props) {
  console.log(props.data)
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState(props.data)
  return (
    <div key={data.id} className="acordeaoVenda" style={{ maxHeight: visible ? 1200 : 75, overflow: visible ? 'scroll' : 'hidden' }}>
      <div onClick={() => setVisible(!visible)}>
        <p>Lançado em {data.lancado}</p>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Nota</th>
              <th>Quandidade</th>
              <th>Peso</th>
              <th>Valor</th>
            </tr>
            <tr>
              <th>{data.data}</th>
              <th>{data.pedido}</th>
              <th>{data.quantidade}</th>
              <th>{data.peso}kg</th>
              <th>R$ {data.valor}</th>
            </tr>
          </thead>
        </table>

      </div>
      <div className="acordeaoVendaBody" style={{ opacity: visible ? 1 : 0 }}>
        <table>
          <tr>
            <th>asdasdasd</th>
          </tr>
        </table>
      </div>
    </div >
  )
}
export function AlertaContainer(props) {
  return (
    <div className="alertaContainer">
      {props.children}
    </div>
  )
}
export function Alerta(props) {
  const [close, setClose] = useState(false)
  useEffect(() => {
    setInterval(() => { setClose(true) }, 6000)
  }, [])
  return (
    !close ? (

      <div className="alerta" style={{ backgroundColor: props.data.code < 400 ? '#4caf50' : '#f44336' }}>
        <div>
          {props.data.code < 400 ? (
            <div>
              <FaRegCheckCircle />
              <p>Sucesso</p>
            </div>
          ) : (
              <div>
                < FaRegTimesCircle />
                <p>Erro</p>
              </div>
            )}
          <p className="alertaMsg" >{props.data.msg}</p>

        </div>
        <FaTimes onClick={() => setClose(true)} />
      </div>

    )

      : null
  )

}
export function Timeline(props) {
  return (
    <div style={{ display: 'grid', gridRowGap: '2rem',borderLeft:5,borderLeftColor:'red',borderLeftStyle:'solid' }}>
      {props.children}
    </div>
  )
}
export function TimelineGrupo(props) {
  return (
    <div>
      <p>2008</p>
      <div style={{ display: 'grid', gridRowGap: '1.5rem' }}>
        {props.children}
      </div>
    </div>
  )
}
export function TimeLineContent(props) {
  const [data, setData] = useState(props.data)

  return data.map(el => {

    return (
      <div style={{ position: 'relative', marginLeft: '1rem' }} key={el.id} >
        <div className="a"></div>
        { AcordeaoVenda({ data: el })}
      </div>
    )
  })

}