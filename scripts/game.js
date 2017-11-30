			////////////// VARS //////////////
				// the main siet
				var shit = $('#shit'),
					toilet = $('#toilet'),
					bathroom = $('#bathroom'),
					gameRunning = false, //false first because duh
					score = 0, // duh
					timer = 200, // x sexonds til you diiiieee
					stank = 10, //life is stanky
				//para alam mo kung saan sya papunta
					dir = { 
						up: false,
						down: false,
						left: false
					},
				//peed
					speed = 4,
					rSpeed = speed,
					lSpeed = speed-1,
					uSpeed = speed*8,
					dSpeed = speed*2,
				//bg
					bgX = 0,
					bgXSpeed = speed+10,
				//poopoo runnin key detection
					oNext = false,
					shitIsRun = false,
					babySteps = 0,
					itJumped = false,
				//intervals
					theLoop,
					createEnemyInt,
					createLifeInt,
					addScoreInt,
					bgMoveInt,
					timerInt,
					pissInt,
					enemyThreshold = 3000,
				//shit's sprite bg position strings because i'm a lazy fuck
					steadyH = '0px -200px',
					steadyM = '-200px -200px',
					steadyL = '-400px -200px',
					walkH = '0px 0px',
					walkM = '-200px 0px',
					walkL = ' -400px 0px',
					jumpH = '0px -400px',
					jumpM = '-200px -400px',
					jumpL = '-400px -400px',
					downH = '0px -200px',
					downM = '-200px -200px',
					downL = '-400px -200px',
				// Sprite secretary if u will
					currShit, // Walk mood
					currJumpShit, // Jump mood
					currDownShit, // Falling down mood
					currSteadyShit, // not moving bitch
				// mga mensahe mula sa tae
					gameOutcome,
					messageIndex,
					gameOutcomeMessages,
					gameShare = {}, // intialize for game outcome share messages
					gameWonArray,
					gameLostArray,
					// For dirty
						gameShareDirty = {},
						gameWonArrayDirty =		[
													'That was impressive motherfucker',
													'U made the Lil Shit happy, look at that face...',
													'Congratulations! you won fucking nothing!',
													'Holy Shet',
													'AAAYYYYYYYYYYY',
													'Congrats, u let the Lil Shit pollute the ocean',
													'The Lil Shit\'s happily melting into the sewers now' ,
													'Fuck, you won.',
													'The Lil Shit\'s still dead inside. U never saved them. This was a lie. Ted Cruz is the Zodiac Killer.',
													'You actually won the fuq'
												],
						gameLostArrayDirty =	[
													'You killed the Lil Shit you sadistic fuck',
													'Do u know the fuck you\'ve done?? look at the shit\'s face',
													'Wow u weak asshole',
													'Hahahahahahahaaaa what the fuck was that',
													'That was a pretty shitty work u did literally',
													'Shit\'s ded',
													'You\'re weaker than the asshole that gave birth to this shit',
													'Good job u fucking killed the Lil Shit',
													'U fucked up u punk bitch',
													'You hurt the Lil Shit\'s feelings u insensitive fuck'
												],
					//for clean version
						gameShareClean = {},
						gameWonArrayClean =		[
													'That was actually impressive',
													'U made the Lil Poop happy, look at that face...',
													'Congratulations! you won nothing!',
													'Holy Poo',
													'AAAYYYYYYYYYYY',
													'Congrats, u let the Lil Poop pollute the ocean',
													'The Lil Poop\'s happily melting into the sewers now' ,
													'Frickity Frack, you won.',
													'The Lil Poop\'s still dead inside. U never saved them. This was a lie. Ted Cruz is the Zodiac Killer.',
													'You actually won the eff'
												],
						gameLostArrayClean =	[
													'You killed the Lil Poop you big meanie',
													'Do u know the hickie you\'ve done?? look at the poop\'s face',
													'Wow u weak butt',
													'Hahahahahahahaaaa what the bleep was that',
													'That was a pretty poopy work u did literally',
													'Poop\'s ded',
													'You\'re weaker than the butt hole that gave birth to this poop',
													'Good job u killed the Lil Poop',
													'U screwed up u punk muffin',
													'You hurt the Lil Poop\'s feelings u insensitive doot doot'
												],
				/*sounds : Music: Leck Mich Im Arsch (Lick Me In The Ass) in B flat Minor by Mozart.
				sfx and music done in Music Studio App(xewton.com) and Bfxr(bfxr.net)*/
					bgMusic = new Audio('sounds/bgmusic.mp3'),
					brownFart = new Audio('sounds/brownfart.mp3'),
					ded = new Audio('sounds/ded.mp3'),
					greenFart = new Audio('sounds/greenfart.mp3'),
					jump = new Audio('sounds/jump.mp3'),
					ow = new Audio('sounds/ow.mp3'),
					win = new Audio('sounds/win.mp3'),
					start = new Audio('sounds/start.mp3'),
					walk = new Audio('sounds/walk.mp3'),
					spraySquirt = new Audio('sounds/squirt.mp3'),
					peepee = new Audio('sounds/peepee.mp3'),
					ping = new Audio('sounds/homebutton.mp3');
					bgMusic.loop = true;

			////////////// FUNCTIONS //////////////

				// Check if the hash of the current url rn is dirty or clean and then changes everything to PG 13 or E for everyone	
				function checkNasty(){
					if(window.location.hash == '#dirty'){
						gameWonArray = gameWonArrayDirty;
						gameLostArray = gameLostArrayDirty;
						if(
							typeof messageIndex !== 'undefined' &&
							typeof gameOutcomeMessages !== 'undefined' &&
							typeof gameOutcome !== 'undefined'
						){
							if(gameOutcome == 'lost'){
								gameOutcomeMessages = gameLostArray;
								gameShare = gameShareDirty.lost;
								$('.tweet').attr('href',gameShare.tw);
							}else if(gameOutcome == 'won'){
								gameOutcomeMessages = gameWonArray;
								gameShare = gameShareDirty.won;
								$('.tweet').attr('href',gameShare.tw);
							}

							message = gameOutcomeMessages[messageIndex];
							$('#finished h1').text(message);
						}
						$('#instructions h1').text('Lil Shit');
						$('#instructions li figure figcaption').each(function(){
							$(this).text(
								$(this).text()
									.replace('pretty', 'fucking')
									.replace('funk', 'fuck')
									.replace('poopy', 'shit')
									.replace('weewee', 'piss')
									.replace('meanies', 'assholes')
								);
							$('#switchNasty').attr('href','#clean');
							$('#switchNasty span.nasty-reverse').text('Clean');
						})
					}else{
						gameWonArray = gameWonArrayClean;
						gameLostArray = gameLostArrayClean;
						if(
							typeof messageIndex !== 'undefined' &&
							typeof gameOutcomeMessages !== 'undefined' &&
							typeof gameOutcome !== 'undefined'
						){
							if(gameOutcome == 'lost'){
								gameOutcomeMessages = gameLostArray;
								gameShare = gameShareClean.lost;
								$('.tweet').attr('href',gameShare.tw);
							}else if(gameOutcome == 'won'){
								gameOutcomeMessages = gameWonArray;
								gameShare = gameShareClean.won;
								$('.tweet').attr('href',gameShare.tw);
							}

							message = gameOutcomeMessages[messageIndex];
							$('#finished h1').text(message);
						}
						$('#instructions h1').text('Lil Poop');
						$('#instructions li figure figcaption').each(function(){
							$(this).text(
								$(this).text()
									.replace('fucking','pretty')
									.replace('fuck','funk')
									.replace('shit','poopy')
									.replace('piss','weewee')
									.replace('assholes','meanies')
								);
							$('#switchNasty').attr('href','#dirty');
							$('#switchNasty span.nasty-reverse').text('Dirty');
						})
					}
				}

				
				// Generates random number to keep this shit exciting
				function randNum(min,max){//duh
					return Math.round(Math.random()*(max-min))+min;
				}
				
				// Checks elements hitting each other in rectangular borders
				// from Trish
				function recthit(rectone, recttwo){
					var r1 = $(rectone);
					var r2 = $(recttwo);
					var r1x = r1.offset().left;
					var r1w = r1.width();
					var r1y = r1.offset().top;
					var r1h = r1.height();
					var r2x = r2.offset().left;
					var r2w = r2.width();
					var r2y = r2.offset().top;
					var r2h = r2.height();
					if( r1y+r1h < r2y ||
						r1y > r2y+r2h ||
						r1x > r2x+r2w ||
						r1x+r1w < r2x ){
						return false;
					}else{
						return true;   
					}				    
				}

				// Checks hit from the center
				// From Trish ulit
				//FOR TOILET ONLY para mas effective coz I'm a dick
				function circlehit(circle1, circle2){
					var c1 = $(circle1);
					var c2 = $(circle2);
					c1.r = c1.width()/2;//radius
					c1.x = c1.position().left + c1.r;
					c1.y = c1.position().top + c1.r;

					c2.r = c2.width()/2;//radius
					c2.x = c2.position().left + c2.r;
					c2.y = c2.position().top + c2.r;			

					var distx = c1.x - c2.x;
					var disty = c1.y - c2.y;

					var squaredist = (distx * distx) + (disty * disty);
					return squaredist <= (c1.r + c2.r) * (c1.r + c2.r);

				}

				//Change speed of enemies faster to make it harder the longer it takes the shit to get to the toilet
				// Why? coz I'm an asshole
				function enemySpeed(){
					if(timer <50){
						return 1000;
					}else if(timer <100){
						return 1500;
					}else if(timer <150){
						return 2000;
					}else if(timer >=150){
						return 2500;
					}
				}
				// Make sprays go pew pew
				//reference from 'star wras battle front' thingy
				function squirt(){
					$('.canSquirt').each(function(){
						var water = $('<div>').addClass('water enemy'), // .enemy class is to track elements hitting the Lil Shit and its effects
							thatWater = $('.water'),
							wWidth = 100,
							wTop = $(this).position().top,
							wLeft = ($(this).position().left)-wWidth,
							wSpeed = enemySpeed();
						water.css({
							top: wTop,
							left: wLeft,
							width: 5
						});
						bathroom.append(water);
						water.animate({
							left: -100
						},{
							duration: ((wSpeed*2)/10),
							easing: 'linear',
							queue: false,
							complete:
							function(){
						        $(this).remove();
							}
						}).animate({
							width: wWidth
						},{
							duration: (wSpeed/100),
							easing: 'linear',
							queue: false
						});
						playSoundLang(spraySquirt);
					});
				}

				// Make enemies generate in shorter intervals the longer it takes for shit to fuck the toilet 
				function enemyTurnUp(){
					if(timer <50){
						enemyThreshold =  1500;
					}else if(timer <100){//100
						enemyThreshold = 2000;//2000
					}else if(timer <250){//150
						enemyThreshold = 2500;//2500
					}else{//150
						enemyThreshold = 3000;
					}
				}

				// This is the program's vagina because it's the thing that births babies. Like the bad babies.
				// Fuck yeah this script is a woman
				// Who run this motherfucker
				// God bless Beyonce
				function createEnemy(){
					//only do shit if the shit is running for real
					if(shitIsRun){
						var enemy = $('<div>').addClass('enemy'),
							enemyClassTypes, //  Amount of types of enemies that can generate as timer shits itself
							sTop = shit.position().top; // Track where Lil Shit is at because some enemies will follow the Lil Shit
						// The longer you live the more enemies you gain
						if(timer < 150){
							enemyClassTypes = randNum(1,5);
						}else if(timer < 160){
							enemyClassTypes = randNum(1,4);
						}else if(timer < 170){
							enemyClassTypes = randNum(1,3);
						}else if(timer < 180){
							enemyClassTypes = randNum(1,2);
						}else{
							enemyClassTypes = 1;
						}
						// Classify the enemy type by enemyClassTypes current number
						if(enemyClassTypes==1){
							enemy.addClass('yellowSpray canSquirt'); // .canSquirt is for tracking if the enemy can shoot disinfectants 
						}else if(enemyClassTypes==2){
							enemy.addClass('plunger');
						}else if(enemyClassTypes==3){
							enemy.addClass('soap');
						}else if(enemyClassTypes==4){
							enemy.addClass('brush');
						}else if(enemyClassTypes==5){
							enemy.addClass('redSpray canSquirt');
						}
						var eMaxWidth = 300, // extra padding outside the viewport of the game
							eLeft = bathroom.width()+eMaxWidth,
							eTop, // variable for setting enemy's y coordinates baed on Lil Shit's whereabouts
							eSpeed = enemySpeed(); // duh
						// Set up enemy intelligence on tracking coordinates of Lil Shit and Speed by type
						if(enemy.hasClass('yellowSpray')){
							eTop = 450;
						}
						if(enemy.hasClass('plunger')){
							eTop = sTop;
							eSpeed-=300;
						}
						if(enemy.hasClass('soap')){
							eTop = randNum(350,450);
							eSpeed+=1000;
						}
						if(enemy.hasClass('brush')){
							eTop = sTop;
							eSpeed = ((eSpeed/10)+750);
						}
						if(enemy.hasClass('redSpray')){
							eTop = randNum(300,375);
							eSpeed-=200;
						}
						enemy.css({
							top: eTop,
							left: eLeft
						}); // Set up initial position of enemy
						bathroom.append(enemy); // Birth it
						enemy.animate({left: -eMaxWidth},eSpeed,'linear',function(){
							$(this).remove();
						});
						enemyTurnUp(); // change enemyThreshold while timer runs
						setTimeout(squirt,(eSpeed/3)); //ini an magung pew pew 
					}					
					createEnemyInt = setTimeout(createEnemy,enemyThreshold); // Run it again bitch
				}

				// This is the asshole
				// It generates farts for the shit to survive the horrors of the bad babies by increasing the stank and assigns a class to specify the stank currency value of the fart
				function createLife(){		
					if(shitIsRun){
						var fartCloudClassInt = randNum(1,5), // set up probabilty of getting green fart to brown fart
							fart = $('<div>').addClass('fart'), // class is to track elements hitting the Lil Shit and its effects
							fCLeft = bathroom.width()+fart.outerWidth(), // initial x coordinates of fart
							theClass;
						if(fartCloudClassInt >= 3){
							theClass = 'brown';
						}else{
							theClass = 'green';
						}
						fart.css({
							top: 150,
							left: fCLeft
						}); //set initial position
						fart.addClass(theClass);
						bathroom.append(fart);
						fart.animate({left: - 100},5000,'linear',function(){
							$(this).remove();
						}); //go on my child
					}	
					createLifeInt = setTimeout(createLife,randNum(10000,20000)); // ulit
				}

				// Peepeehole of the script. Its piss makes the Lil Shit slide on the bathroom floor and gives speed boost
				function createPiss(){		
					if(shitIsRun){
						var piss = $('<div>').addClass('piss'), // class is to track elements hitting the Lil Shit and its effects
							pLeft = bathroom.width()+piss.outerWidth(); // initial x coordinates of piss
						piss.css({
							top: 525,
							left: pLeft
						}); // set initial position
						bathroom.append(piss);
						piss.animate({left: - 200},3000,'linear',function(){
							$(this).remove();
						}); // go on my child
					}
					pissInt = setTimeout(createPiss,randNum(15000,20000)); // one more tiiime
				}

				// Run until it's die time
				function runTimer(){
					if(shitIsRun){
						timer--;
						$('#timer h2').text(timer);
						if(timer<=50){
							$('#timer h2').css({
								color : '#800'
							});
						}
						if(timer <= 0){
							timer = 0;
							gameOutcome = 'lost';
							finished();
						}
					}
				}

				// duh
				function addScore(){
					if(shitIsRun){
						score+=5;
						if(score<0){
							score=0;
						}
						$('#score span').text(score);
					}
				}

				// duh
				function updateStankBar(){
					var percent= (stank/10)*100;
					$('#stankBar #bar').animate({width:percent+'%'},400);
					if(stank<=0){
						stank = 0;
						gameOutcome = 'lost';
						finished();
					}
				}

				// Make sprite look like it moves
				function bgMove(){ 
					if(shitIsRun){
						bgX -= bgXSpeed;
						bathroom.css({
							'background-position' : bgX+'px 0px'
						});	
					}
				}

				//the moment u get hit by enemies
				function ouchie(){
					playSound(ow);
					shit.addClass('itHurt');
					setTimeout(function(){
						shit.removeClass('itHurt');
					},1000);
				}

				// make the toilet look like its insulting the shit's incompetence
				function thisToilet(){
					toilet.animate({top: 200},500)
					.animate({top: 300},500,thisToilet);
				}

				// The DJ of the script
				// put ya sound in a function so u can stop them all in one line when game is done para tipid sa line
				function playSoundLang(track){//eh
					if(gameRunning){
						track.play();
						track.muted = false;
					}
					if(!gameRunning){
						track.muted = true;
					}
				}

				// Another DJ for sounds
				//pag pwede magduplicate an sound
				function playSound(track){
					var tempSound = track.cloneNode();
					tempSound.play();
				}

				// Run the game. Handle with care.
				function gameOn(){
					// coordinates for jumping
					var newTop = 0,
						newLeft = 0,
					// shit coordinates
						sTop = shit.position().top,
						sLeft = shit.position().left,
						sHeight = shit.outerHeight(),
						sWidth = shit.outerWidth(),
					// Bathroom cage walls
						bHeight = (bathroom.innerHeight()-50),
						bWidth = (bathroom.innerWidth());				
					//for the shit to show how hurt it is aka da sprites
						if(stank >= 7){
							currShit = walkH;
							currJumpShit = jumpH;
							currDownShit = downH;
							currSteadyShit = steadyH;
						}
						if(stank < 7){
							currShit = walkM;
							currJumpShit = jumpM;
							currDownShit = downM;
							currSteadyShit = steadyM;
						}
						if(stank <= 3){
							currShit = walkL;
							currJumpShit = jumpL;
							currDownShit = downL;
							currSteadyShit = steadyL;
						}
					// Track where the Lil Shit is moving to
						if(dir.left){ // heeeeeeere's jOHNY ... if to the left to the left u are dragged to die
							newLeft -=lSpeed;
							shit.css({
								'background-position' : currShit
							});
						}
						if(dir.up && itJumped && !dir.down){
							newTop -=uSpeed;
							shit.css({
								'background-position' : currJumpShit
							});
						}
						if(!dir.up && !itJumped && dir.down){
							newTop +=dSpeed;
							shit.css({
								'background-position' : currDownShit
							});
						}
						if(sTop + newTop < 70){ // cap the top so the Lil Shit doesn't like float away to heaveb
							newTop = 70;
							newTop -= sTop;
						}
						if(sLeft + newLeft < -100){ // when the Shit gives up say say bye
							newLeft = -100;
							newLeft -= sLeft;
							dir.left = false;
							gameOutcome = 'lost';
							finished();
							//shits game over in here
						}
						if(sTop + newTop + sHeight > bHeight){
							newTop = 0;
							newTop += (bHeight-sTop-sHeight);
							dir.down = false;
						}
						if(sLeft + newLeft + sWidth > bWidth){
							newLeft = 0;
							newLeft += (bWidth-sLeft-sWidth);
						}
					// Update coordinates based on movement
						shit.css({
							left: '+='+newLeft,
							top: '+='+newTop
						});
					// Track what the fuck did the Lil Shit put its fecal stains on
						$('.enemy').each( function(){
							if(recthit(shit, $(this))){
								ouchie();
								if(
									$(this).hasClass('yellowSpray') ||
									$(this).hasClass('water')
								){
									stank--;
									score-=50;
								}
								if($(this).hasClass('plunger')){
									stank-=2;
									score-=75;
								}
								if($(this).hasClass('soap')){
									stank-=5;
									score-=100;
								}
								if($(this).hasClass('brush')){
									stank--;
									score-=500;
								}
								if($(this).hasClass('redSpray')){
									stank-=3;
									score-=200;
								}
								if(score<0){
									score=0;
								}
								$(this).remove();							
								updateStankBar();
							}
						});
						$('.fart').each( function(){//shit is alive-er
							if(recthit(shit, $(this))){
								if($(this).hasClass('brown')){
									playSoundLang(brownFart);
									stank++;
									if(stank>10){
										stank=10;
									}
									score+=50;
								}
								if($(this).hasClass('green')){
									playSoundLang(greenFart);
									stank = 10;
									score+=100;
								}
								$(this).remove();
								updateStankBar();
							}
						});
						$('.piss').each( function(){//shit gets hold of a monster drink
							if(recthit(shit, $(this))){
								playSoundLang(peepee);
								$(this).remove();
								rSpeed=rSpeed*5;
								score+=100;
								setTimeout(function(){
									rSpeed=speed;
								},500)
							}
						});
						toilet.each(function(){//the miracle
							if(circlehit(shit, $(this))){
								score+=5000;							
								$(this).remove();
								shit.remove();
								gameOutcome = 'won';
								finished();
							}
						});
					// Keep all the fucks running if the game's still in progress	
					if(gameRunning){
						theLoop = window.requestAnimationFrame(gameOn);
					}
				}
				function runIt(){ //duh. handle with care.
					if(gameRunning){
						bgMusic.play(); // duh
						thisToilet(); // toilet now gloating
						// Intervals
							timerInt = setInterval(runTimer,1000);
							bgMoveInt = setInterval(bgMove,1000/30);
							addScoreInt = setInterval(addScore,125);
							createEnemyInt = setTimeout(createEnemy,enemyThreshold);
							pissInt = setTimeout(createPiss,randNum(15000,20000));
							createLifeInt = setTimeout(createLife,randNum(10000,20000));
							theLoop = window.requestAnimationFrame(gameOn); // run game
					}
				}
				//duh
				function finished(){
					//Set up messages
					gameShareDirty = {
						won : {
							fb: 'I scored '+score+' playing the Lil Shit Game!',
							tw: 'http://twitter.com/intent/tweet?status=I%20scored%20'+score+'%20playing%20the%20Lil%20Shit%20Game%20and%20won!%20http%3A%2F%2Fsamzabala.com%2Fbathroomrampage'

						},
						lost : {
							fb: 'I scored '+score+' playing the Lil Shit Game and won!',
							tw: 'http://twitter.com/intent/tweet?status=I%20scored%20'+score+'%20playing%20the%20Lil%20Shit%20Game%20http%3A%2F%2Fsamzabala.com%2Fbathroomrampage'

						}
					};
					gameShareClean = {
						won : {
							fb: 'I scored '+score+' playing the Lil Poop Game and won!',
							tw: 'http://twitter.com/intent/tweet?status=I%20scored%20'+score+'%20playing%20the%20Lil%20Poop%20Game%20and%20won!%20http%3A%2F%2Fsamzabala.com%2Fbathroomrampage'

						},
						lost : {
							fb: 'I scored '+score+' playing the Lil Poop Game!',
							tw: 'http://twitter.com/intent/tweet?status=I%20scored%20'+score+'%20playing%20the%20Lil%20Poop%20Game%20http%3A%2F%2Fsamzabala.com%2Fbathroomrampage'

						}
					};

					// window.cancelAnimationFrame(theLoop);
					// window.cancelAnimationFrame(gameOn); //idk wtf the parameter should be really so no
					if(gameOutcome == 'lost'){
						playSoundLang(ded); // the dead song
						$('#bigshit').css({
							'background-position': '0px -600px'
						}); // make Lil Shit emotional
						gameOutcomeMessages = gameLostArray; // which array of sentences
						if(window.location.hash == '#dirty'){ gameShare = gameShareDirty.lost; }else{ gameShare = gameShareClean.lost; }
						$('.tweet').attr('href',gameShare.tw);
					}else if(gameOutcome == 'won'){
						playSoundLang(win); // the win song
						$('#bigshit').css({
							'background-position': '0px -900px'
						});
						gameOutcomeMessages = gameWonArray;  // which array of sentences

						if(window.location.hash == '#dirty'){ gameShare = gameShareDirty.won; }else{ gameShare = gameShareClean.won; }
						$('.tweet').attr('href',gameShare.tw);
					};
					//i-reset lahAAAT
					// TODO probably not make the browser refresh when restarting the game
					theLoop = null;
					gameRunning = false;
					shitIsRun = false;
					enemyThreshold = 3000;
					clearInterval(addScoreInt);
					clearInterval(bgMoveInt);
					clearInterval(timerInt);
					clearTimeout(createEnemyInt);
					clearTimeout(createLifeInt);
					clearTimeout(pissInt);
					bgMusic.pause();
					bgMusic.currentTime = 0;
					playSoundLang.currentTime = 0;
					messageIndex = randNum(0,gameOutcomeMessages.length-1),
					message = gameOutcomeMessages[messageIndex];
					$('.fart').remove();
					$('.enemy').remove();
					$('.piss').remove();
					$('#instructions').css({display: 'none'});
					$('#finished').css({display:'block'});
					$('#finished h1').html(message);
					$('h2 span').text(score);
					$('#startOverlay').fadeIn(1000);
					$('.textbox').fadeIn(500);
				}

			////////////// INTIALIZATION, EVENTS AND CONTROLSSS //////////////

				// Censorship
					checkNasty();
					$('#switchNasty').click(function(e){
						e.preventDefault;
						window.location.hash = this.hash;
					});

					$(window).on('hashchange',function(e) {
						e.preventDefault;
						checkNasty();
					});

					$(document).ready(function(){
						setTimeout( function(){ 
							$('#bathroom.gameport #startOverlay .textbox').animate({'opacity':1},200);
						},500);
					});


				// Key Controls
					// 	- 32 for space bar coz thats what google said but IE is a bitch and they use 13 so fuck it
					//  - 80 for p | 79 for o
					//  - 65 for a | 83 for s
				
				
					$(document).keydown(function(e){
						if(gameRunning){
							if(e.which == 32 || e.which == 13){ //if jumping
								itJumped = true
								dir.up = true;
								dir.down = false;
								setTimeout(function(){
									itJumped = false;
									dir.up = false;
									dir.down = true;
								
								},180);// Have gravity catch up to the Lil shit. from lady gaga and taco birthing siopao game holy shet
								playSoundLang(jump); // Hear a boing
								walk.muted = true; // don't hear it's feet go pap pap .. no wait it doesn't have legs
								setTimeout(function(){
									walk.muted = false;
								},800); // pap pap again motherfucke
							}
						}
					});//and thats the keydown

					$(document).keyup(function(e){
						if(gameRunning){
							if(
								oNext == false && e.which == 80 ||
								oNext == false && e.which == 65
							){ // P or A is press
								playSoundLang(walk);
								if(shitIsRun){ // Lil Shit is used to voilence and ready to face death
									shit.stop(true).animate({left: '+='+rSpeed},100,function(){
										shit.stop();  //fuck off queue-ing animation keep the Lil Shit moving
									});
								}else{ // Lil Shit is still full of innocence
									shit.css({
										'background-position': currShit
									});
									setTimeout(function(){
										shit.css({
											'background-position': steadyH
										});
									},300)
									shit.stop(true).animate({left: '+='+100},200,function(){
										shit.stop();
									});
									babySteps++; // take one more step without being fucked yet
								}
								oNext = true;
							}else if(
								oNext == true && e.which == 79 ||
								oNext == true && e.which == 83	
							){ // O or S IS PRESS
								playSoundLang(walk);
								if(shitIsRun){
									shit.stop(true).animate({left: '+='+rSpeed},100,function(){
										shit.stop();
									});
								}else{
									shit.css({
										'background-position': currShit
									});
									setTimeout(function(){
										shit.css({
											'background-position': steadyH
										});
									},300)
									shit.stop(true).animate({left: '+='+100},200,function(){
										shit.stop();
									});
									babySteps++;
								}
								oNext = false;
							}else if(
								oNext == true && e.which == 80 ||
								oNext == false && e.which == 79 ||
								oNext == true && e.which == 65 ||
								oNext == false && e.which == 83
							){ // Key patterns are out of sync. DRAG TO HELL
								if(shitIsRun){
									dir.left = true;
								}
							}
							if(e.which == 32 || e.which == 13){ // Ii Jumped
								itJumped = false;
								walk.muted = false;
								dir.up = false;
								dir.down = true;
							}
							if(babySteps >3){ // you only get to have 3 steps until you die
								babySteps=3;
							}
							if(!shitIsRun && babySteps == 3){ // ding ding ding motherfucker time to die!!!!
								shitIsRun = true;
							}
							if(shitIsRun){ // Satan is constantly calling them.
								dir.left = true;
							}
						}
					});//key up is ded


				$('#start').click(function(){ // trigger all the shit				
					gameRunning = true;
					start.play();
					$('.textbox').fadeOut(500);
					$('#startOverlay').fadeOut(1000);
					$('#instruction').css({display: 'none'});
					runIt();
				});
				$('#start').mousedown(function(){ // could do it in css but nahhh
					$(this).css({
						'top': '.125em',
						'-moz-box-shadow': '0px .125em #552578',
						'-webkit-box-shadow': '0px .125em #552578',
						'box-shadow': '0px .125em #552578'
					});
				});
				$('#start').mouseup(function(){
					$(this).css({
						'top': '0',
						'-moz-box-shadow': '0px .25em #552578',
						'-webkit-box-shadow': '0px .25em #552578',
						'box-shadow': '0px .25em #552578'
					});
				});
				$('.restart').click(function(){// refresh game to restart
					ping.play();
					$(this).css({
						'top': '.125em',
						'-moz-box-shadow': '0px .125em #552578',
						'-webkit-box-shadow': '0px .125em #552578',
						'box-shadow': '0px .125em #552578'
					});
					location.reload();
				});

				//Landing page
				$('.homebutton').click(function(){
					ping.play();
				})
			// facebook
				// initialize app
				window.fbAsyncInit = function() {
					FB.init({
						appId            : '1591193187876202',
						autoLogAppEvents : true,
						xfbml            : true,
						version          : 'v2.11'
					});
				};
				(function(d, s, id){
					var js, fjs = d.getElementsByTagName(s)[0];
					if (d.getElementById(id)) {return;}
					js = d.createElement(s); js.id = id;
					js.src = "https://connect.facebook.net/en_US/sdk.js";
					fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));
				// make share possible
				$('.share.fb').on('click',function(e){
					e.preventDefault;
					if(!gameRunning){
						FB.ui({
							method: 'share',
							display:'popup',
							href:'http://samzabala.com/bathroomrampage',
							quote: gameShare.fb,
						}, function(response){});
					}
				})