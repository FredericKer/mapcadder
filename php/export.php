<?php
/**
 * @author Alessandro Vernassa 
 */
    
    ini_set('display_errors', 1);

    $jsonArray = json_decode($_POST['inputJSON']);
    
    ob_start();
    require_once 'dxfwriter.php';
?>

        <a href="?download">download dxf</a><br />
        
        <?php
            $shape = new DXF();
            $shape->addLayer("POLYLINE", DXF_COLOR_GREEN);
            $shape->addLayer("POLYLINE_TEXT", DXF_COLOR_GREEN);
            $shape->addLayer("POINT", DXF_COLOR_RED);
            $shape->addLayer("POINT_TEXT", DXF_COLOR_RED);
            $shape->addLayer("POLYGON", DXF_COLOR_BLUE);
            $shape->addLayer("POLYGON_TEXT", DXF_COLOR_BLUE);
            //$shape->addText(12, 110, 0, $a1, 5, "text");
            //$shape->addCircle(50, 100, 0, 50, "mylayer");
            
            for($i=0;$i<count($jsonArray->point);$i++){
                if($jsonArray->point[$i][0]>123){
                    $shape->addCircle($jsonArray->point[$i][0],$jsonArray->point[$i][1],0,700,"POINT");
                }else{
                    $shape->addCircle($jsonArray->point[$i][0],$jsonArray->point[$i][1],0,0.005,"POINT");
                 //$shape->addText($jsonArray->point[$i][0],$jsonArray->point[$i][1]+15,0, "POINT".$i, 1, "POINT_TEXT");
                }
            	 

            }

            for($j=0;$j<count($jsonArray->polyline);$j++){

                if(count($jsonArray->polyline)>0){

                    for($i=1;$i<count($jsonArray->polyline[$j])-1;$i++){

                        $shape->addLine($jsonArray->polyline[$j][$i][0], $jsonArray->polyline[$j][$i][1], 0, $jsonArray->polyline[$j][$i+1][0], $jsonArray->polyline[$j][$i+1][1], 0, "POLYLINE");

                    }//end for i
                }//end  if
                

            }//end for j

            ////////// start polygon
            for($j=0;$j<count($jsonArray->polygon);$j++){

                if(count($jsonArray->polygon)>0){

                    for($i=1;$i<(count($jsonArray->polygon[$j]));$i++){

                        if($i<(count($jsonArray->polygon[$j])-1)){
                            $shape->addLine($jsonArray->polygon[$j][$i][0], $jsonArray->polygon[$j][$i][1], 0, $jsonArray->polygon[$j][$i+1][0], $jsonArray->polygon[$j][$i+1][1], 0, "POLYGON");
                        }

                        if($i==(count($jsonArray->polygon[$j])-1)){
                            $shape->addLine($jsonArray->polygon[$j][(count($jsonArray->polygon[$j]))-1][0], $jsonArray->polygon[$j][(count($jsonArray->polygon[$j]))-1][1], 0, $jsonArray->polygon[$j][1][0], $jsonArray->polygon[$j][1][1], 0, "POLYGON");
                        }

                    }//end for i

                    //$shape->addLine($jsonArray->polygon[$j][(count($jsonArray->polygon[$j]))][0], $jsonArray->polygon[$j][(count($jsonArray->polygon[$j]))][1], 0, $jsonArray->polygon[$j][1][0], $jsonArray->polygon[$j][1][1], 0, "POLYGON");

                }//end  if
                

            }//end for j

            
            
            
            $shape->SaveFile("MapOutput.dxf");

            /*
            if (isset($_GET['download']))
                {
                    $shape->SaveFile("myFile.dxf");        
                }

            $dxfstring = $shape->getString();
            */

            //echo "<h2>dxf string:</h2><pre>$dxfstring</pre>";
        ?>
