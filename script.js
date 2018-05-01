var szer_kw = Math.floor((window.innerWidth-440) / 50);
var wys_kw = Math.floor(window.innerHeight/ 50);
var tabela_tworzenie = "";
var historia_punktu_s;
var labirynttablica = new Array();
var metody;
var wynik = [];


var punktstartu = new Array();


for(i = 0; i<wys_kw; i++)
    {
        tabela_tworzenie += "<tr>";
        labirynttablica[i] = new Array();
        for(x = 0; x< szer_kw; x++)
            {
                tabela_tworzenie += "<td></td>";
                labirynttablica[i][x] = 0;
                console.log("Definiuje: %s, %s", i, x);                
            }
        
        tabela_tworzenie += "</tr>";
    }

$("#labirynt table").html(tabela_tworzenie);







var klikniecia = 0;
var start;

$( "td" ).click(function() {
    t = $(this).parent();
                console.log("Kliknales w: %s, %s", ($("tr").index( t )), ($("td").index( this )%szer_kw));     
    if(klikniecia == 0)
        {
            $(this).css("background-color","green");
            klikniecia ++;
            $("ul li:nth-child(1)").addClass("done");
            
            sprawdzpozycje(($("tr").index( t )), ($("td").index( this )%szer_kw),"s");
            
            punktstartu[0]=($("tr").index( t ));
            punktstartu[1]=($("td").index( this )%szer_kw);
            historia_punktu_s = [[punktstartu[0]],[punktstartu[1]]]; 
            metody = [historia_punktu_s];
        }else if(klikniecia == 1)
        {
            $(this).css("background-color","red");
            $("ul li:nth-child(2)").addClass("done");
            klikniecia ++;
            $("a#sprawdz").css("display","block");
            
            
            sprawdzpozycje(($("tr").index( t )), ($("td").index( this )%szer_kw),"k");
        }else
            {
            $("ul li:nth-child(3)").addClass("done");
                if(sprawdzpozycje(($("tr").index( t )), ($("td").index( this )%szer_kw))==0)
                    {
                        $(this).css("background-color","black");
                        sprawdzpozycje($("tr").index( t ), ($("td").index( this )%szer_kw),"c");
                    }else if(sprawdzpozycje(($("tr").index( t )), ($("td").index( this )%szer_kw))=="c")
                    {
                        $(this).css("background-color","white");
                        sprawdzpozycje($("tr").index( t ), ($("td").index( this )%szer_kw),0);
                    }
            }
            
        
});

function kopiatablicy(tablica)
            {
                tablica_x = [];
                tablica_y = [];
                tablicatworzona = [tablica_x, tablica_y];
                for(i in tablica[0])
                    {
                        tablica_x[i] = tablica[0][i];
                    }
                for(i in tablica[1])
                    {
                        tablica_y[i] = tablica[1][i];
                    }
                //console.log(tablicatworzona)
                return tablicatworzona;
}

function wypiszwkonsoli()
    {
        
    }
function sprawdzpozycje(wiersz,indeks,wartosc)
    {
        if(wartosc!=null)
            {
                labirynttablica[wiersz][indeks] = wartosc;
            }
        return labirynttablica[wiersz][indeks];
    }
function znajdzpowt(x,y,historia)
    {
        if(historia[0].length == 0)
            {return true;}
    
        x_historia = historia[0];
        y_historia = historia[1];
        
        for(i in x_historia)
            {
                if(x_historia[i]==x && y_historia[i]==y)
                    {
                        return false;
                    }
            }
        return true;
    }
function mozewejscwpunkt(x,y)
    {
        if(x>=0 && x<wys_kw && y >=0 && y<szer_kw)
            {
                if(sprawdzpozycje(x,y)!="c"&&sprawdzpozycje(x,y)!="s"&&sprawdzpozycje(x,y)!="trasa")
                    {
                        return true;
                    }
            }
            return false;
    }
function dodajpunktdohistori(x,y,historia)
    {
        //console.log(historia);
        new_historia = historia;
        new_historia[0].unshift(x);
        new_historia[1].unshift(y);
        
        
        
        return new_historia;
    }
function mozliwosci(historia)
    {
        x = historia[0][0];
        y = historia[1][0];
        //alert("wykonuje mozliwosci dla "+x+" "+y);
        
        historia_1 = kopiatablicy(historia);
        historia_2 = kopiatablicy(historia);
        historia_3 = kopiatablicy(historia);
        historia_4 = kopiatablicy(historia);       
                        
                        var sprawdzanykwadrat = "tr:nth-child("+(x+1)+") td:nth-child("+(y+1)+")";
                       // $(sprawdzanykwadrat).css("background","blue");
        x++;
        if(mozewejscwpunkt(x,y))
            {
                if(znajdzpowt(x,y,historia))
                    {
                        //alert(x +" "+ y);
                
                        if(sprawdzpozycje(x,y) == "k")
                            {
                                wynik.push(dodajpunktdohistori(x,y,historia_1));
                            }
                        var x_j = x+1;
                        var y_j = y+1;
                        var sprawdzanykwadrat = "tr:nth-child("+x_j+") td:nth-child("+y_j+")";
                        //$(sprawdzanykwadrat).css("background","yellow");
                        metody.push(dodajpunktdohistori(x,y,historia_1));
                        sprawdzpozycje(x,y,"trasa");
                        
                    }
                            
            }     
        x--;  
        x--;
        if(mozewejscwpunkt(x,y))
            {
                if(znajdzpowt(x,y,historia))
                    {
                
                //alert(x +" "+ y);
                        if(sprawdzpozycje(x,y)=="k")
                            {
                                wynik.push(dodajpunktdohistori(x,y,historia_2));
                            }
                        var x_j = x+1;
                        var y_j = y+1;
                        var sprawdzanykwadrat = "tr:nth-child("+x_j+") td:nth-child("+y_j+")";
                        //$(sprawdzanykwadrat).css("background","yellow");
                        metody.push(dodajpunktdohistori(x,y,historia_2));
                        sprawdzpozycje(x,y,"trasa");
                    }
                            
            }   
        x++;
        y++;
        if(mozewejscwpunkt(x,y))
            {
                if(znajdzpowt(x,y,historia))
                    {
                
                //alert(x +" "+ y);
                        if(sprawdzpozycje(x,y)=="k")
                            {
                                wynik.push(dodajpunktdohistori(x,y,historia_3));
                            }
                        var x_j = x+1;
                        var y_j = y+1;
                        var sprawdzanykwadrat = "tr:nth-child("+x_j+") td:nth-child("+y_j+")";
                        //$(sprawdzanykwadrat).css("background","yellow");
                        metody.push(dodajpunktdohistori(x,y,historia_3));
                        sprawdzpozycje(x,y,"trasa");
                    }
                            
            }   
        y--;
        y--;
        if(mozewejscwpunkt(x,y))
            {
                if(znajdzpowt(x,y,historia))
                    {
                
                //alert(x +" "+ y);
                        if(sprawdzpozycje(x,y)=="k")
                            {
                                wynik.push(dodajpunktdohistori(x,y,historia_4));
                            }
                        var x_j = x+1;
                        var y_j = y+1;
                        var sprawdzanykwadrat = "tr:nth-child("+x_j+") td:nth-child("+y_j+")";
                        //$(sprawdzanykwadrat).css("background","yellow");
                        metody.push(dodajpunktdohistori(x,y,historia_4));
                        sprawdzpozycje(x,y,"trasa");
                    }
                            
            }
            y++;
                        var sprawdzanykwadrat = "tr:nth-child("+(x+1)+") td:nth-child("+(y+1)+")";
                        //$(sprawdzanykwadrat).css("background","pink");
                        
            //console.log(metody);                            
            
    }
function rysujwynik(tablica)
    {
        tablica[0].unshift(x);
        tablica[1].unshift(y);
        
        for(var d = 1; d < tablica[0].length; d++)
            {
                var x = tablica[0][d];
                var y = tablica[1][d];
                console.log(x);
                console.log(y);
                 var x_j = x+1;
                 var y_j = y+1;
                 var sprawdzanykwadrat = "tr:nth-child("+x_j+") td:nth-child("+y_j+")";
                 $(sprawdzanykwadrat).css("background","blue");
            }
    }
function sprawdzdroge()
    {
        do{
        dlugosc = metody.length;
        //alert(dlugosc);
        for(k=0; k < dlugosc; k++)
            {
                //alert("podaje inteks"+k);
               mozliwosci(metody[k]); 
            }
            //console.log(metody);
        for(p=0; p < dlugosc; p++)
            {
               metody.shift();
            }
            //console.log(metody);
        }while(wynik.length == 0 && metody.length != 0);
        if( metody.length == 0)
            {
                alert("No path")
            }
        if( wynik.length != 0)
            {
                rysujwynik(wynik[0]);
            }
    }    
    
    