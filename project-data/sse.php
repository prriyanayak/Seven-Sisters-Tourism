
<?php
	
	header('Content-Type: text/event-stream');
	header('Cache-Control: no-cache');
	ob_start();		
	ob_flush();  	
	flush();
	$file=fopen("visitor.txt","r");
	$oldtime=filemtime("visitor.txt");
	$ret = fread($file, filesize("visitor.txt"));
	fclose($file);
	$count = (int)$ret;
	$fp = fopen("visitor.txt", "w");
	$count = $count + 1;
	ftruncate($fp, 0);
	fwrite($fp, $count);
	fclose($fp);
	
	$file=fopen("visitor.txt","r");
	while(true){
		clearstatcache();		//php caches data
		$newtime=filemtime("visitor.txt");
		if($newtime > $oldtime){			
			$ret = fread($file, filesize("visitor.txt"));
			$count = (int)$ret;
			$oldtime = $newtime;
			echo "data: $count\n\n";
			ob_flush();
			flush();
			break;
		}		
		
		sleep(5);
					
	}
?>