<?php
	
	/*
	$markerid = $_POST['markerid'];
	$date = $POST['data'];
	$lat = $POST['lat'];
	$lng = $POST['lng'];
	*/
	$markerid = 'spotmap72704';
	$data="";
	$lat ="";
	$lng ="";

	$servername = "localhost";
	$username = "krpano";
	$password = "krpano";
	$dbname = "krpano";
	$countt = 0;

	$markerJSON = '{';


	$conn = new mysqli($servername,$username,$password,$dbname);

	if($conn->connect_error){
		die("Connected failed:" . $conn->connect_error);
	}

	if($markerid!=NULL &&  $date==NULL && $lat==NULL && $lng==NULL){// FOR READING SCENE 

		$sql = "SELECT * FROM scenetable WHERE markerid="."'".$markerid."'";

	}


	function convert297($lata,$lona){

		$coor97 = [6378137,6356752.31414,0.00669438,0.00673949675,250000,0];

		$clatlng = [];

		$latr = $lata*pi()/180;
		$lonr = $lona*pi()/180;
			
		$T=pow(tan($latr),2);
    	$C=$coor97[3]*pow(cos($latr),2);
   	 	$A=($lonr-121*pi()/180)*cos($latr);
   		$N=$coor97[0]/sqrt(1-$coor97[2]*pow(sin($latr),2));
    	$G=$coor97[0]*((1-$coor97[2]/4-3*$coor97[2]*$coor97[2]/64-5*$coor97[2]*$coor97[2]*$coor97[2]/256)*$latr-(3*$coor97[2]/8+3*$coor97[2]*$coor97[2]/32+45*$coor97[2]*$coor97[2]*$coor97[2]/1024)*sin(2*$latr)+(15*$coor97[2]*$coor97[2]/256+45*$coor97[2]*$coor97[2]*$coor97[2]/1024)*sin(4*$latr)-(35*$coor97[2]*$coor97[2]*$coor97[2]/3072)*sin(6*$latr));

   		$Xr=$coor97[4]+0.9999*$N*($A+(1-$T+$C)*$A*$A*$A/6+(5-18*$T+$T*$T+72*$C-58*$coor97[3])*pow($A,5)/120);
    	$Yr=$coor97[5]+0.9999*($G+$N*tan($latr)*($A*$A/2+(5-$T+9*$C+4*$C*$C)*pow($A,4)/24+(61-58*$T+$T*$T+600*$C-300*$coor97[3])*pow($A,6)/720));


    	$clatlng[0] = $Xr;
    	$clatlng[1] = $Yr;
    	//echo $coor97[2];

    	//echo  $Xr.'============';
    	return $clatlng;
	}
	
	function convert2LatLng($X,$Y){
		
		$coor97 = [6378137,6356752.31414,0.00669438,0.00673949675,250000,0];
		$m0=0.9999;
		$Y0=0;

		$latlng = [];
		
		$e1= (1-sqrt(1-$coor97[2]))/(1+sqrt(1-$coor97[2]));
		$miu = ($Y-$Y0)/($coor97[0]*$m0*(1-$coor97[2]/4-3*$coor97[2]*$coor97[2]/64-5*$coor97[2]*$coor97[2]*$coor97[2]/256));
		$Lad1 = $miu+(3*$e1/2-27*pow($e1,3)/32)*sin(2*$miu)+(21*$e1*$e1/16-55*pow($e1,4)/32)*sin(4*$miu)+(151*pow($e1,3)/96)*sin(6*$miu)+(1097*pow($e1,4)/512)*sin($miu*8);
		$N1=$coor97[0]/sqrt(1-$coor97[2]*pow(sin($Lad1),2));
		$T1=pow(tan($Lad1),2);
		$C1 = $coor97[3]*pow(cos($Lad1),2);
		$M1 = $coor97[0]*(1-$coor97[2])/pow((1-$coor97[2]*pow(sin($Lad1),2)),1.5);
		$D = ($X-250000)/($N1*$m0);


		$latlng[0] = ($Lad1-($N1*tan($Lad1)/$M1)*($D*$D/2-(5+3*$T1+10*$C1-4*$C1*$C1-9*$coor97[3])*pow($D,4)/24+(61+90*$T1+298*$C1+45*$T1*$T1-252*$coor97[3]-3*$C1*$C1)*pow($D,6)/720))*180/pi();

		$latlng[1] = 121+($D-(1+2*$T1+$C1)*$D*$D*$D/6+(5-2*$C1+28*$T1-3*$C1*$C1+8*$coor97[3]+24*$T1*$T1)*pow($D,5)/120)/cos($Lad1)*180/pi();
		
		return $latlng;

	}


	/*
	else if($markerId=='' && $markerIdH !='' && $cdate!=''){
		$sql = "SELECT * FROM markerhistory WHERE markerIdH="."'".$markerIdH."'"." AND date="."'".$cdate."'";
	}

	else if($markerId!='' && $markerIdH =='' && $cdate!=''){
		$sql = "SELECT * FROM markerhistory WHERE markerId="."'".$markerId."'";
	}

	else if($markerId=='' && $markerIdH !='' && $cdate==''){
		$sql = "SELECT * FROM markerhistory WHERE markerIdH="."'".$markerIdH."'";
	}
	*/


	$result = $conn->query($sql);
	
	$dateArray = [];
	$dateCount = 0;
	$latC;
	$lngC;

	if($result->num_rows>0){

		$row = $result->fetch_assoc();
		
		$sceneid = $row["sceneid"];
		$markerid = $row["markerid"];
		$date = $row["date"];
		$lat = $row["lat"];
		$lng = $row["lng"];
		$heading = $row["heading"];
		$desc = $row["desc"];
		$jsclick = $row["jsclick"];
		$pegmanimg = $row["pegmanimg"];
		$messagexml = $row["messagexml"];
		$skinxml = $row["skinxml"];
		$corexml = $row["corexml"];
		$thumbnailimg = $row["thumbnailimg"];
		$previewimg = $row["previewimg"];
		$highfrontimg = $row["highfrontimg"];
		$highrightimg = $row["highrightimg"];
		$highbackimg = $row["highbackimg"];
		$highleftimg = $row["highleftimg"];
		$highupimg = $row["highupimg"];
		$highdownimg = $row["highdownimg"];
		$lowfrontimg = $row["lowfrontimg"];
		$lowrightimg = $row["lowrightimg"];
		$lowbackimg = $row["lowbackimg"];
		$lowleftimg = $row["lowleftimg"];
		$lowupimg = $row["lowupimg"];
		$lowdownimg = $row["lowdownimg"];
		$arrow1marker = $row["arrow1marker"];
		$arrow1ath = $row["arrow1ath"];
		$arrow2marker = $row["arrow2marker"];
		$arrow2ath = $row["arrow2ath"];
		$arrow3marker = $row["arrow3marker"];
		$arrow3ath = $row["arrow3ath"];
		$arrow4marker = $row["arrow4marker"];
		$arrow4ath = $row["arrow4ath"];

		$latC = $row['lat'];
		$lngC = $row['lng'];
		
	}

	else {
    	echo "0 results";
	}


	$xy97 = convert297($latC,$lngC);

	

	$xmax = $xy97[0]+0;
	$xmin = $xy97[0]-0;
	$ymax = $xy97[1]+0;
	$ymin = $xy97[1]-0;

	$latlngmax = convert2LatLng($xmax,$ymax);
	$latlngmin = convert2LatLng($xmin,$ymax);

	echo $latlngmax[0].','.$latlngmax[1];


	$hsql = "SELECT * FROM scenetable WHERE lat<=".$latlngmax[0]." AND lat >=".$latlngmin[0]." AND lng<=".$latlngmax[1]." AND lng>=".$latlngmin[1]." GROUP BY date";
	
	$resulth = $conn->query($hsql);

	$hmarkerid =[];
	$hmarkerdate = [];

	if($resulth->num_rows>0){

	    $row = $resulth->fetch_assoc();
	    $hmarkerid[$hcount] = $row["markerid"];
	    $hmarkerdate[$hocunt] = $row["date"];
	    $hcount++;
		//$historyJSON .= "[".$row['markerid'].",".$row['date']."],";

	}

	else {
    	echo "0 results";
	}

	$historyJSON = "[";

	for($i=0;$i<count($hmarkerid);$i++){
		
		if($i<count($hmarkerid)-1){
			$historyJSON .= "[".$hmarkerid[$i].",".$hmarkerdate[$i]."],";
		}else if($i==count($hmarkerid-1)){
			$historyJSON .= "[".$hmarkerid[$i].",".$hmarkerdate[$i]."]]";
		}
		

	}

	

/*
	$markerJSON = '{"mdata":{"sceneid":'.'"'.$sceneid.'"'.','.
					 '"markerid":'.'"'.$markerid.'"'.','.
					 '"lat":'.$lat.','.
					 '"lng":'.$lng.','.
				 	'"heading":'.$heading.','.
			   		'"desc":'.$desc.','.
					'"jsclick":'.'"'.$jsclick.'"'.','.
					'"pegmanimg":'.'"'.$pegmanimg.'"'.','.
				 	'"messagexml":'.$messagexml.','.
				 	'"skinxml":'.$skinxml.','.
				   '"corexml":'.'"'.$corexml.'"'.','.
				   '"thumbnailimg":'.'"'.$thumbnailimg.'"'.','.
				   '"previewimg":'.'"'.$previewimg.'"'.','.
				   '"highfrontimg":'.'"'.$highfrontimg.'"'.','.
				   '"highrightimg":'.'"'.$highrightimg.'"'.','.
				   '"highbackimg":'.'"'.$highbackimg.'"'.','.
				   '"highleftimg":'.'"'.$highleftimg.'"'.','.
				   '"highupimg":'.'"'.$highupimg.'"'.','.
				   '"highdownimg":'.'"'.$highdownimg.'"'.','.
				   '"lowfrontimg":'.'"'.$lowfrontimg.'"'.','.
				   '"lowrightimg":'.'"'.$lowrightimg.'"'.','.
				   '"lowbackimg":'.'"'.$lowbackimg.'"'.','.
				   '"lowleftimg":'.'"'.$lowleftimg.'"'.','.
				   '"lowupimg":'.'"'.$lowupimg.'"'.','.
				   '"lowdownimg":'.'"'.$lowdownimg.'"'.','.
				   '"arrow1marker":'.'"'.$arrow1marker.'"'.','.
			  	   '"arrow1ath":'.'"'.$arrow1ath.'"'.','.
			  	   '"arrow2marker":'.'"'.$arrow2marker.'"'.','.
			  	   '"arrow2ath":'.'"'.$arrow2ath.'"'.','.
			  	   '"arrow3marker":'.'"'.$arrow3marker.'"'.','.
			  	   '"arrow3ath":'.'"'.$arrow3ath.'"'.','.
			  	   '"arrow4marker":'.'"'.$arrow4marker.'"'.','.
			  	   '"arrow4ath":'.'"'.$arrow4ath.'"'.
			  	   '"historyscene":'.$historyJSON.


	'}}';

	echo $markerJSON;
*/
?>