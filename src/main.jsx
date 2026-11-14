import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronLeft, Clipboard, Clock3, Layers3, MapPin, Menu, Package, Route, ShieldCheck, Snowflake, Warehouse, X } from 'lucide-react'
import './style.css'

const depots = [
  { id: 'north', name: 'Северный терминал', region: 'Московская область', area: 'Химки · Север', distance: '12 км от МКАД', temp: true, capacity: 5200, storage: 35, ops: 20, color: 'blue', tag: 'Оптимальный выбор', features: ['Температура +2…+8 °C', 'Паллетное хранение', 'Погрузка и обработка'] },
  { id: 'west', name: 'Западный логистический парк', region: 'Московская область', area: 'Одинцово · Запад', distance: '18 км от МКАД', temp: true, capacity: 3800, storage: 32, ops: 17.1666667, color: 'purple', tag: 'Ниже стоимость', features: ['Температура +2…+8 °C', 'Паллетное хранение', 'Приёмка по записи'] },
  { id: 'south', name: 'Южные ворота', region: 'Московская область', area: 'Домодедово · Юг', distance: '24 км от МКАД', temp: false, capacity: 6100, storage: 34, ops: 17.67, color: 'orange', tag: 'Больше места', features: ['Сухое хранение', 'Паллетное хранение', 'Погрузка и обработка'] },
  { id: 'east', name: 'Восток складской', region: 'Московская область', area: 'Балашиха · Восток', distance: '9 км от МКАД', temp: true, capacity: 2600, storage: 34.5, ops: 17.1666667, color: 'mint', tag: 'Удобный подъезд', features: ['Температура +2…+8 °C', 'Паллетное хранение', 'Круглосуточный въезд'] },
]
const DEMO_REGION = 'Московская область'
const money = (n) => new Intl.NumberFormat('ru-RU').format(Math.round(n))

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }
  const input = document.createElement('textarea')
  input.value = text
  input.setAttribute('readonly', '')
  input.style.position = 'fixed'
  input.style.opacity = '0'
  document.body.appendChild(input)
  input.select()
  const copied = document.execCommand('copy')
  input.remove()
  if (!copied) throw new Error('Clipboard unavailable')
}

function WarehouseScene() {
  return <div className="scene" aria-label="Иллюстрация складского терминала с грузовиком" role="img">
    <div className="scene-orbit orbit-one"/><div className="scene-orbit orbit-two"/>
    <div className="scene-label"><span className="live-dot"/> ДЕМО-СЦЕНАРИЙ <ArrowUpRight size={14}/></div>
    <div className="scene-glass scene-glass-top"><span className="glass-icon"><Route size={17}/></span><span>Логистика<br/><b>в одном маршруте</b></span><span className="glass-spark">✳</span></div>
    <svg className="warehouse-art" viewBox="0 0 620 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="roof" x1="80" y1="100" x2="520" y2="250" gradientUnits="userSpaceOnUse"><stop stopColor="#FBFDFF"/><stop offset="1" stopColor="#D2E7FF"/></linearGradient><linearGradient id="front" x1="110" y1="210" x2="480" y2="320" gradientUnits="userSpaceOnUse"><stop stopColor="#FFFFFF"/><stop offset="1" stopColor="#C8DEFF"/></linearGradient><linearGradient id="side" x1="400" y1="180" x2="540" y2="310" gradientUnits="userSpaceOnUse"><stop stopColor="#C5DBFF"/><stop offset="1" stopColor="#8FB7F4"/></linearGradient><linearGradient id="truck" x1="190" y1="290" x2="388" y2="350" gradientUnits="userSpaceOnUse"><stop stopColor="#315AEF"/><stop offset="1" stopColor="#78A4FF"/></linearGradient><filter id="shadow" x="30" y="60" width="570" height="350" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="16"/></filter></defs>
      <ellipse cx="322" cy="339" rx="220" ry="25" fill="#83A9E7" opacity=".24" filter="url(#shadow)"/>
      <path d="M89 150 286 54l244 78-202 100L89 150Z" fill="url(#roof)" stroke="#FFF" strokeWidth="3"/>
      <path d="m89 150 239 82v107L89 253V150Z" fill="url(#front)" stroke="#FFF" strokeWidth="3"/>
      <path d="m328 232 202-100v105L328 339V232Z" fill="url(#side)" stroke="#FFF" strokeWidth="3"/>
      <path d="m127 165 158-78 189 61-160 80-187-63Z" fill="#EEF6FF" stroke="#B9D4FA" strokeWidth="2"/>
      <path d="m149 175 138-67 151 49-139 69-150-51Z" fill="#F9FCFF"/>
      <path d="m178 185 107-52v62l-107 52v-62Z" fill="#DCEBFF"/><path d="m202 194 57-28v39l-57 28v-39Z" fill="#A9CAFA"/>
      <path d="m291 255 27 9v65l-27-9v-65Z" fill="#91B5F0"/><path d="m341 238 27-13v67l-27 13v-67Z" fill="#739AE1"/>
      <path d="m393 212 27-13v66l-27 13v-66Z" fill="#739AE1"/><path d="m445 186 27-13v67l-27 13v-67Z" fill="#739AE1"/>
      <path d="m90 261 239 79 202-101" stroke="#AAC8F5" strokeWidth="3" strokeDasharray="5 8"/>
      <g><path d="M170 267h129l30 23v50H170v-73Z" fill="url(#truck)" stroke="#FFF" strokeWidth="3"/><path d="M299 276h45l32 33v31h-47v-50l-30-23Z" fill="#4580F1" stroke="#FFF" strokeWidth="3"/><path d="m309 285 29 2 22 22h-51v-24Z" fill="#DFF0FF"/><path d="M181 279h102v9H181z" fill="#A8C8FF" opacity=".75"/><circle cx="207" cy="341" r="17" fill="#F8FBFF" stroke="#4C73D5" strokeWidth="6"/><circle cx="207" cy="341" r="5" fill="#8AA7E3"/><circle cx="335" cy="341" r="17" fill="#F8FBFF" stroke="#4C73D5" strokeWidth="6"/><circle cx="335" cy="341" r="5" fill="#8AA7E3"/><path d="M171 313h12v5h-12z" fill="#DCEAFF"/></g>
      <path d="m406 300 46-23 46 15-45 23-47-15Z" fill="#F5FBFF" stroke="#B6D1F6" strokeWidth="2"/><path d="m406 300 47 15v28l-47-16v-27Z" fill="#D8E8FF"/><path d="m453 315 45-23v27l-45 24v-28Z" fill="#ADC9F4"/>
      <path d="M92 361h422" stroke="#ADC8EE" strokeWidth="2" strokeLinecap="round"/><path d="M115 374h109" stroke="#C1D6F3" strokeWidth="2" strokeLinecap="round"/><path d="M424 370h53" stroke="#C1D6F3" strokeWidth="2" strokeLinecap="round"/>
    </svg>
    <div className="scene-glass scene-glass-bottom"><span className="warehouse-icon"><Warehouse size={17}/></span><span><b>Всё подходит</b><br/><small>условия хранения совпали</small></span><span className="check-circle"><Check size={14}/></span></div>
    <span className="scene-star star-a">✳</span><span className="scene-star star-b">✦</span><span className="scene-chip">склад ↗ маршрут ↗ груз</span>
  </div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [pallets, setPallets] = useState('200')
  const [days, setDays] = useState('90')
  const [temperature, setTemperature] = useState(true)
  const [selected, setSelected] = useState('north')
  const [error, setError] = useState('')
  const [requestReady, setRequestReady] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState('')
  const [role, setRole] = useState('seeker')
  const [pilotPrepared, setPilotPrepared] = useState(false)
  const [pilotCopied, setPilotCopied] = useState(false)
  const [pilotCopyError, setPilotCopyError] = useState('')
  const filtered = depots
    .filter(d => d.region === DEMO_REGION)
    .map(d => ({ ...d, compatible: !temperature || d.temp, total: (d.storage * Number(pallets || 0) + d.ops * Number(pallets || 0)) * Number(days || 0) }))
    .sort((a, b) => a.total - b.total)
  const navTo = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
  const resetRequestFeedback = () => { setRequestReady(false); setCopied(false); setCopyError('') }
  const backToParameters = () => { setStep(1); resetRequestFeedback() }
  const proceed = () => {
    const palletCount = Number(pallets)
    const duration = Number(days)
    if (!Number.isInteger(palletCount) || palletCount < 1 || palletCount > 5000) { setError('Укажите целое число паллет от 1 до 5 000.'); return }
    if (!Number.isInteger(duration) || duration < 1 || duration > 365) { setError('Укажите целое число дней от 1 до 365.'); return }
    setError('')
    setRequestReady(false)
    setCopied(false)
    setCopyError('')
    setStep(2)
  }
  const current = filtered.find(d => d.id === selected && d.compatible) || filtered.find(d => d.compatible)
  const requestText = `Предварительная заявка «Резерв»\nГруз: ${pallets} паллет, срок ${days} дней${temperature ? ', режим +2…+8 °C' : ', без температурного режима'}\nРегион: ${DEMO_REGION}\nОбъект: ${current?.name ?? 'не выбран'}\nРасчётный пример: ${money(current?.total ?? 0)} ₽\nСтатус: ожидает подтверждения складского оператора. Демо: условные данные.`
  const pilotText = `Запрос на обсуждение пилота платформы «Резерв»\nРоль: ${role === 'seeker' ? 'ищу склад для груза' : 'предоставляю склад'}\nРегион демо: ${DEMO_REGION}\nПрошу обсудить требования и возможный формат пилота.\nСформировано локально: сайт не отправляет запрос на сервер.`
  async function copyRequest() {
    try { await copyText(requestText); setCopied(true); setCopyError('') }
    catch { setCopied(false); setCopyError('Не удалось скопировать. Проверьте разрешение браузера на буфер обмена.') }
  }
  async function copyPilotRequest() {
    try { await copyText(pilotText); setPilotCopied(true); setPilotCopyError('') }
    catch { setPilotCopied(false); setPilotCopyError('Не удалось скопировать. Проверьте разрешение браузера на буфер обмена.') }
  }

  return <>
    <header className="header"><a className="brand" href="#top" onClick={() => setMenuOpen(false)} aria-label="Резерв — на главную"><span className="brand-mark"><Layers3 size={19}/></span>РЕЗЕРВ<span className="brand-dot">.</span></a>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Основная навигация"><a href="#benefits" onClick={() => setMenuOpen(false)}>Преимущества</a><a href="#how" onClick={() => setMenuOpen(false)}>Как работает</a><a href="#demo" onClick={() => setMenuOpen(false)}>Демо</a><a href="#pricing" onClick={() => setMenuOpen(false)}>Тарифы</a></nav>
      <button className="button button-small header-cta" onClick={() => navTo('demo')}>Посмотреть демо <ArrowRight size={16}/></button>
      <button className="menu-toggle" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>
    {menuOpen && <button className="menu-scrim" aria-label="Закрыть меню" onClick={() => setMenuOpen(false)}/>}
    <main id="top">
      <section className="hero wrap"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"/> УМНЫЙ ПОИСК СКЛАДА <span className="demo-pill">ДЕМО</span></div><h1>Склад,<br/><span>который подходит.</span></h1><p className="hero-text">Сравните условия и полную стоимость хранения. Выберите подходящий вариант и отправьте предварительную заявку.</p><div className="hero-actions"><button className="button" onClick={() => navTo('demo')}>Посмотреть демо <ArrowRight size={18}/></button><span className="hero-note"><span className="mini-shield"><ShieldCheck size={15}/></span> Без регистрации<br/>и реального бронирования</span></div><div className="hero-foot"><span><span className="tiny-dot"/> Условные данные</span><span className="hero-divider"/><span>Московская область</span></div></div><WarehouseScene/></section>

      <section className="benefits wrap" id="benefits"><div className="section-heading"><div><div className="eyebrow muted"><span className="eyebrow-line"/> НЕ ПРОСТО СВОБОДНОЕ МЕСТО</div><h2>Подбор начинается<br/>с <span className="blue-text">совместимости.</span></h2></div><p>Свободный склад ещё не значит подходящий.<br/>Мы показываем условия рядом — до заявки.</p></div><div className="benefit-grid"><article className="benefit-card"><div className="benefit-icon icon-blue"><Snowflake size={21}/></div><span className="card-number">01 / УСЛОВИЯ</span><h3>Подходит вашему грузу</h3><p>Учитываем температуру и обязательные параметры. Несовместимый объект не попадёт в подходящие.</p><span className="benefit-deco deco-snow">❋</span></article><article className="benefit-card"><div className="benefit-icon icon-lilac"><Layers3 size={21}/></div><span className="card-number">02 / РАСЧЁТ</span><h3>Полная стоимость</h3><p>Сравниваем хранение и операции за одинаковый период — не только ставку за место.</p><span className="benefit-deco deco-ring"/></article><article className="benefit-card"><div className="benefit-icon icon-mint"><ShieldCheck size={21}/></div><span className="card-number">03 / ПРОЗРАЧНО</span><h3>Понятный следующий шаг</h3><p>Условия и расчётный пример видны заранее. Размещение подтверждает оператор склада.</p><span className="benefit-deco deco-check">✓</span></article></div></section>

      <section className="how-section" id="how"><div className="wrap how-inner"><div className="section-heading"><div><div className="eyebrow muted"><span className="eyebrow-line"/> ПРОСТОЙ ПУТЬ К ЗАЯВКЕ</div><h2>Пять шагов.<br/><span className="blue-text">Никаких догадок.</span></h2></div><div className="step-count">01 <span/> 05</div></div><div className="process-track">{[['01','Опишите груз','Паллеты, срок и условия'],['02','Отсеем неподходящее','Покажем причину исключения'],['03','Сравните стоимость','На общем горизонте хранения'],['04','Выберите склад','Посмотрите параметры объекта'],['05','Отправьте заявку','Оператор подтвердит условия']].map(([n,t,d],i)=><article className="process-step" key={n}><div className="process-top"><span>{n}</span>{i<4&&<span className="process-line"/>}</div><h3>{t}</h3><p>{d}</p>{i===4&&<ArrowUpRight className="process-arrow" size={18}/>}</article>)}</div></div></section>

      <section className="demo-section" id="demo"><div className="wrap"><div className="demo-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> ИНТЕРАКТИВНЫЙ ПОДБОР</div><h2>Проверьте на <span className="blue-text">примере.</span></h2><p>Измените параметры груза и сравните условные предложения.</p></div><div className="demo-badge"><span className="live-dot"/> ДЕМО: УСЛОВНЫЕ ДАННЫЕ</div></div>
        <div className="demo-shell"><div className="demo-progress"><div className="progress-label"><span>ВАШ ПОДБОР</span><span>ШАГ {step} <span className="of-total">/ 3</span></span></div><div className="progress-track"><span style={{width:`${step*33.333}%`}}/></div><div className="progress-steps">{['Параметры груза','Подходящие склады','Предварительная заявка'].map((s,i)=><div key={s} className={step===i+1?'progress-step active':step>i+1?'progress-step done':'progress-step'}><span className="progress-number">{step>i+1?<Check size={13}/>:`0${i+1}`}</span><span>{s}</span></div>)}</div></div>
          {step===1&&<div className="demo-content"><div className="demo-form-col"><div className="demo-title-line"><div><span className="form-kicker">01 — ВАШ ГРУЗ</span><h3>Что нужно разместить?</h3></div><Package className="form-title-icon" size={24}/></div><div className="fields-grid"><label className="field"><span>Количество паллет</span><div className="input-wrap"><input type="number" min="1" max="5000" step="1" value={pallets} onChange={e=>{setPallets(e.target.value);setError('');resetRequestFeedback()}}/><span className="input-unit">паллет</span></div><small>целое число от 1 до 5 000</small></label><label className="field"><span>Срок хранения</span><div className="input-wrap"><input type="number" min="1" max="365" step="1" value={days} onChange={e=>{setDays(e.target.value);setError('');resetRequestFeedback()}}/><span className="input-unit">дней</span></div><small>целое число от 1 до 365 дней</small></label></div><div className="field region-field"><span>Регион поиска</span><div className="region-note"><MapPin size={16}/><b>{DEMO_REGION}</b><small>Другие регионы пока не представлены в демо.</small></div></div><div className="temp-control"><div className="temp-icon"><Snowflake size={18}/></div><div className="temp-copy"><b>Температурный режим</b><span>Требуется хранение при +2…+8 °C</span></div><label className="switch"><input type="checkbox" checked={temperature} onChange={e=>{setTemperature(e.target.checked);resetRequestFeedback()}}/><span className="switch-track"/></label></div>{error&&<div className="form-error" role="alert">{error}</div>}<button className="button form-button" onClick={proceed}>Подобрать склады <ArrowRight size={18}/></button></div><aside className="demo-aside"><div className="aside-orbit"/><div className="aside-icon"><Warehouse size={23}/></div><span className="aside-kicker">РАСЧЁТНЫЙ ПРИМЕР</span><h4>Сравните условия,<br/>а не только адрес.</h4><p>Задайте параметры груза. Мы покажем подходящие объекты и объясним, почему другие исключены.</p><div className="aside-rule"/><div className="aside-mini-row"><span className="tiny-icon"><Clock3 size={15}/></span><span><b>Одинаковый срок</b><small>единый горизонт расчёта</small></span></div><div className="aside-mini-row"><span className="tiny-icon"><Layers3 size={15}/></span><span><b>Составная стоимость</b><small>хранение + операции</small></span></div><span className="aside-watermark">Р.</span></aside></div>}
          {step===2&&<div className="results-content"><div className="results-top"><div><span className="form-kicker">02 — СРАВНЕНИЕ</span><h3>Подходящие склады</h3><p>{pallets} паллет · {days} дней · {temperature?' +2…+8 °C · ':''}{DEMO_REGION}</p></div><button className="back-button" onClick={backToParameters}><ChevronLeft size={16}/> Изменить груз</button></div><div className="formula-note"><span className="formula-mark"><Layers3 size={16}/></span><span><b>Как считаем</b> · (ставка хранения + операции) × паллеты × дни <span className="formula-example">· условные цены</span></span></div><div className="warehouse-list">{filtered.map(d=><article key={d.id} className={`warehouse-card ${!d.compatible?'incompatible':''} ${selected===d.id&&d.compatible?'selected':''}`} onClick={()=>{if(d.compatible){setSelected(d.id);resetRequestFeedback()}}} onKeyDown={e=>{if((e.key==='Enter'||e.key===' ')&&d.compatible){e.preventDefault();setSelected(d.id);resetRequestFeedback()}}} tabIndex={d.compatible?0:-1} role={d.compatible?'radio':'article'} aria-checked={d.compatible?selected===d.id:undefined}><div className={`warehouse-thumb ${d.color}`}><div className="thumb-building"><span/><span/><span/><span/></div><div className="thumb-ground"/><div className="thumb-pallet"/></div><div className="warehouse-info"><div className="warehouse-name-row"><h4>{d.name}</h4>{d.compatible&&<span className={`warehouse-tag ${d.color}`}>{d.tag}</span>}</div><div className="warehouse-loc"><MapPin size={13}/>{d.area}<span>·</span>{d.distance}</div>{d.compatible?<><div className="warehouse-features">{d.features.map(f=><span key={f}><Check size={12}/>{f}</span>)}</div><div className="rate-breakdown">Хранение {money(d.storage * Number(pallets) * Number(days))} ₽ · операции {money(d.ops * Number(pallets) * Number(days))} ₽</div><div className="warehouse-cost-mobile">{money(d.total)} ₽</div></>:<div className="not-compatible"><X size={13}/>Не подходит: объект не поддерживает режим +2…+8 °C</div>}</div>{d.compatible&&<div className="warehouse-price"><span>ПОЛНАЯ СТОИМОСТЬ</span><b>{money(d.total)} <i>₽</i></b><small>за {days} дней · {pallets} паллет</small><span className={`radio-mark ${selected===d.id?'checked':''}`}>{selected===d.id&&<span/>}</span></div>}</article>)}</div><div className="results-bottom"><span className="operator-note"><ShieldCheck size={16}/> Условия и доступность подтверждает оператор склада.</span><button className="button" onClick={()=>{if(current){setRequestReady(false);setCopied(false);setCopyError('');setStep(3)}}} disabled={!current}>Выбрать и продолжить <ArrowRight size={18}/></button></div></div>}
          {step===3&&<div className="request-content"><div className="request-success-icon"><Check size={28}/></div><span className="form-kicker">03 — ПРЕДВАРИТЕЛЬНАЯ ЗАЯВКА</span><h3>Ваш вариант готов к запросу</h3><p className="request-lead">Проверьте сводку. Условия и доступность подтвердит складской оператор.</p><div className="request-summary"><div className="summary-head"><div><span>ВЫБРАННЫЙ ОБЪЕКТ</span><h4>{current?.name}</h4><small><MapPin size={13}/> {current?.area}</small></div><span className="demo-pill">ДЕМО</span></div><div className="summary-items"><div><span>Груз</span><b>{pallets} паллет</b></div><div><span>Срок</span><b>{days} дней</b></div><div><span>Режим</span><b>{temperature?'+2…+8 °C':'Без температурного режима'}</b></div><div><span>Регион</span><b>{DEMO_REGION}</b></div></div><div className="summary-total"><span>Условная полная стоимость</span><b>{money(current?.total ?? 0)} <i>₽</i></b><small>Расчётный пример · хранение + операции</small></div><div className="status-row"><span className="status-icon"><Clock3 size={16}/></span><span><b>Ожидает подтверждения складского оператора</b><small>Совместимость, наличие и тариф проверяются оператором.</small></span></div></div>{requestReady?<><div className="formed-message"><span className="formed-check"><Check size={16}/></span><span><b>Демо-заявка сформирована.</b> Реальное размещение и бронирование не подтверждены.</span></div><button className="copy-button" onClick={copyRequest}><Clipboard size={16}/>{copied?'Заявка скопирована':'Скопировать заявку'}</button>{copyError&&<p className="copy-error" role="alert">{copyError}</p>}</>:<button className="button request-button" onClick={()=>{setCopied(false);setCopyError('');setRequestReady(true)}}>Сформировать демо-заявку <ArrowRight size={18}/></button>}<button className="back-button request-back" onClick={()=>setStep(2)}><ChevronLeft size={16}/> Вернуться к предложениям</button></div>}
        </div><p className="demo-disclaimer"><span>i</span> Это демонстрационная модель на условных данных. Расчёт не является офертой. Фактическую совместимость, доступность и тариф подтверждает оператор.</p></div></section>

      <section className="map-section wrap"><div className="map-copy"><div className="eyebrow muted"><span className="eyebrow-line"/> ОБЗОР ОБЪЕКТОВ</div><h2>Логистика<br/>становится <span className="blue-text">ближе.</span></h2><p>Схема показывает распределение условных объектов. Расположение и доступность не являются фактическими.</p><div className="map-legend"><span><i className="legend-dot dot-blue"/>С температурой</span><span><i className="legend-dot dot-gray"/>Сухое хранение</span></div></div><div className="schematic-map" aria-label="Схема демонстрационных объектов в Московской области" role="img"><div className="map-grid"/><div className="map-road road-a"/><div className="map-road road-b"/><div className="map-road road-c"/><div className="map-ring ring-a"/><div className="map-ring ring-b"/><span className="map-center"><span>МОСКВА</span><i/></span>{[['Северный терминал','m1','blue'],['Западный парк','m2','blue'],['Южные ворота','m3','gray'],['Восток складской','m4','blue']].map(([n,pos,c])=><span className={`map-pin ${pos}`} key={pos}><i className={c}/><b>{n}</b></span>)}<span className="map-caption"><span className="live-dot"/>ДЕМО-СХЕМА</span></div></section>

      <section className="pricing-section" id="pricing"><div className="wrap pricing-inner"><div className="section-heading"><div><div className="eyebrow muted"><span className="eyebrow-line"/> ПОНЯТНЫЙ ПРИНЦИП</div><h2>Платформа помогает.<br/><span className="blue-text">Склад хранит.</span></h2></div><div className="role-switch" role="group" aria-label="Выберите роль"><button className={role==='seeker'?'active':''} onClick={()=>{setRole('seeker');setPilotPrepared(false);setPilotCopied(false);setPilotCopyError('')}}>Ищу склад</button><button className={role==='provider'?'active':''} onClick={()=>{setRole('provider');setPilotPrepared(false);setPilotCopied(false);setPilotCopyError('')}}>Предоставляю склад</button></div></div><div className="pricing-card"><div className="pricing-main"><span className="pricing-kicker">{role==='seeker'?'ДЛЯ КОМПАНИЙ С ГРУЗОМ':'ДЛЯ СКЛАДСКИХ ОПЕРАТОРОВ'}</span><h3>{role==='seeker'?'Доступ к подбору и сравнению':'Профиль объекта и входящие запросы'}</h3><p>{role==='seeker'?'Подписка за доступ к сервису. Стоимость хранения вы оплачиваете напрямую оператору выбранного объекта.':'Подписка за доступ к платформе. Условия размещения и расчёты подтверждаются оператором.'}</p><button className="text-link" onClick={()=>navTo('contact')}>Запросить пилот <ArrowRight size={16}/></button></div><div className="pricing-points"><div><span className="price-check"><Check size={15}/></span><span><b>Подписка</b><small>за доступ к сервису</small></span></div><div><span className="price-check"><Check size={15}/></span><span><b>Оплата хранения</b><small>напрямую оператору</small></span></div><div><span className="price-check"><Check size={15}/></span><span><b>Комиссия платформы</b><small>0% за сделку</small></span></div><span className="pricing-note">Принцип модели · условия пилота обсуждаются</span></div><div className="pricing-orb"/></div><p className="pricing-footnote">Будущие функции — личный кабинет сети, цифровой двойник, Smart Split и IoT — пока не входят в демо.</p></div></section>

      <section className="contact-section wrap" id="contact"><div className="contact-card"><div className="contact-glow"/><div className="contact-copy"><div className="eyebrow"><span className="eyebrow-line"/> СЛЕДУЮЩИЙ ШАГ</div><h2>Есть груз?<br/><span>Проверим сценарий.</span></h2><p>Подготовьте локальный запрос, чтобы обсудить ваши требования к подбору складов.</p><div className="contact-note"><ShieldCheck size={16}/> Запрос не отправляется на сервер и не содержит персональных данных.</div></div><div className="contact-action"><span className="contact-index">R / DEMO</span><p>Сформируйте текст запроса для обсуждения пилота.</p>{!pilotPrepared?<button className="button" onClick={()=>{setPilotPrepared(true);setPilotCopied(false);setPilotCopyError('')}}>Сформировать запрос пилота <ArrowRight size={18}/></button>:<><div className="pilot-draft"><b>Запрос сформирован локально</b><span>{pilotText}</span></div><button className="button pilot-copy" onClick={copyPilotRequest}><Clipboard size={16}/>{pilotCopied?'Запрос скопирован':'Скопировать запрос'}</button>{pilotCopyError&&<small className="copy-error" role="alert">{pilotCopyError}</small>}</>}<small>ДЕМО · НИЧЕГО НЕ ОТПРАВЛЯЕТСЯ</small></div></div></section>
    </main>
    <footer className="footer wrap"><a className="brand footer-brand" href="#top"><span className="brand-mark"><Layers3 size={17}/></span>РЕЗЕРВ<span className="brand-dot">.</span></a><span className="footer-demo"><span className="tiny-dot"/> Демонстрационная модель на условных данных</span><nav aria-label="Ссылки в подвале"><a href="#benefits">О платформе</a><a href="#demo">Демо-подбор</a><a href="#pricing">Модель оплаты</a></nav><span className="footer-copy">© Резерв · концепция продукта</span></footer>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
