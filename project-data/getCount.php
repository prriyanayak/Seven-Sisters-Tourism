<?php
	ob_start();
	extract($_GET);
	if($time){	
		$last=$time;	
	}
	else{
		$last=null;
	}
	
	$loaded = 1;

	$file=fopen("visitor.txt","r");
	while(true){
		clearstatcache();		//php caches data
		$new=filemtime("visitor.txt");

		if($new>$last){			
			$ret = fread($file, filesize("visitor.txt"));
			$count = (int)$ret;
			// fclose($file);

			$fp = fopen("visitor.txt", "w");
			$count = $count + 1;
			ftruncate($fp, 0);
			fwrite($fp, $count);
			fclose($fp);
			echo $count.";".$new;
			break;
		}		
		else{
			sleep(5);
			continue;
		}				
	}


?>


