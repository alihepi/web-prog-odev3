import React from "react";
import "./App.css";

function Arama({ aramaMetni, onSearch }) {
  return (
    <div>
      <label htmlFor="arama">Ara: </label>
      <input id="arama" type="text" onChange={onSearch} value={aramaMetni} />
    </div>
  );
}

/*
function Arama(props){
  function handleChange(event){
    setAramaMetni(event.target.value);
    props.onSearch(event); 
  }

  return(
    <div>
      <label htmlFor="arama">Ara: </label>
      <input id="arama" type="text" onChange={handleChange} value={props.aramaMetni}/>
    </div>
    
  )
}*/

function Yazi({ url, baslik, yazar, yorum_sayisi, puan }) {
  return (
    <li>
      <span>
        <a href={url}>{baslik}</a>,
      </span>
      <span>
        <b>Yazar:</b> {yazar},{" "}
      </span>
      <span>
        <b>Yorum Sayısı:</b> {yorum_sayisi},{" "}
      </span>
      <span>
        <b>Puan:</b> {puan}
      </span>
    </li>
  );
}

function Liste({ yazilar }) {
  return (
    <div>
      <ul>
        {yazilar.map(function (yazi) {
          return <Yazi key={yazi.id} {...yazi} />;
        })}{" "}
      </ul>
    </div>
  );
}

function App() {
  const [aramaMetni, setAramaMetni] = React.useState(
    localStorage.getItem("aranan") || ""
  );
  const yaziListesi = [
    {
      baslik: "React Öğreniyorum",
      url: "www.sdu.edu.tr",
      yazar: "Sinan Yüksel",
      yorum_sayisi: 3,
      puan: 4,
      id: 0
    },
    {
      baslik: "Web Teknolojileri ve Programlama",
      url: "wwww.google.com.tr",
      yazar: "Asım Yüksel",
      yorum_sayisi: 2,
      puan: 5,
      id: 1
    },
    {
      baslik: "Website",
      url: "www.alimutlu.net",
      yazar: "Ali Mutlu",
      yorum_sayisi: 5,
      puan: 5,
      id: 2
    },
    {
      baslik: "Blog",
      url: "blog.alimutlu.net",
      yazar: "Ali Mutlu",
      yorum_sayisi: 1,
      puan: 4,
      id: 3
    }
  ];

  const arananYazilar = yaziListesi.filter(function (yazi) {
    let baslikAranan = yazi.baslik.toLowerCase().includes(aramaMetni.toLowerCase());
    let yazarAranan = yazi.yazar.toLowerCase().includes(aramaMetni.toLowerCase());
    
    return baslikAranan || yazarAranan;
  });

  const handleSearch = (event) => {
    setAramaMetni(event.target.value);
  };

  React.useEffect(() => {
    localStorage.setItem("aranan", aramaMetni);
  }, [aramaMetni]);

  return (
    <React.Fragment>
      <h1>Yazılar</h1>
      <Arama aramaMetni={aramaMetni} onSearch={handleSearch} />
      <hr />
      <Liste yazilar={arananYazilar} />
    </React.Fragment>
  );
}

export default App;
