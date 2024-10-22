const Ques = ({ item, onComplete, route, onSendData, flag2 }) => {
  let { time } = route.params;
  const [currentItem, setCurrentItem] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const delay = Number(time); // Delay time in milliseconds
  const currentIndexRef = useRef(0);
  const flag = useRef(false);

  const n = item.length;

  const startInterval = () => {
    currentIndexRef.current = 0;
    setIsRunning(true);
    setCurrentItem(null); // Reset current item on new question

    const runInterval = () => {
      if (currentIndexRef.current === item.length) {
        Speech.speak('Answer is', { onDone: () => handleNextItem() });
        setCurrentItem('Answer is');
        currentIndexRef.current++;
      } else if (currentIndexRef.current < item.length) {
        let toSpeak = '';
        if (currentIndexRef.current === 0) {
          // First item
          toSpeak = item[currentIndexRef.current].toString();
        } else {
          // Subsequent items
          const operator = item[currentIndexRef.current];
          const operand = item[currentIndexRef.current + 1];
          toSpeak = operator === '*' ? `multiply ${operand}` : `${operator} ${operand}`;
          setCurrentItem(`${operator} ${operand}`);
        }

        setCurrentItem(toSpeak); // Set the current item to be displayed
        Speech.speak(toSpeak, {
          onDone: () => {
            // After speaking, apply delay before moving to the next item
            setTimeout(handleNextItem, delay);
          },
        });
      } else {
        setIsRunning(false);
        if (onComplete) {
          onComplete();
          Speech.stop();
          flag.current = true;
        }
      }
    };

    const handleNextItem = () => {
      currentIndexRef.current += currentIndexRef.current === 0 ? 1 : 2; // Increment index based on the first or subsequent items
      runInterval();
    };

    // Start the first item without delay
    runInterval();
  };

  useFocusEffect(
    useCallback(() => {
      if (item.length) {
        startInterval(); // Start the interval when the item changes
      }

      return () => {
        Speech.stop();
      };
    }, [item]) // Depend on item only
  );

  useEffect(() => {
    if (flag.current && onComplete) {
      onSendData(true);
    }
  }, [flag.current, onSendData]);

  const repeatQuestion = () => {
    currentIndexRef.current = 0;
    setCurrentItem(null);
    flag.current = false;
    startInterval(); // Restart the interval
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.spekable_txt}>
          {currentItem && <Text style={{ marginHorizontal: 5 }}>{currentItem}</Text>}
        </Text>
        {!isRunning && <Button title="Repeat" onPress={repeatQuestion} />}
      </View>
    </View>
  );
};
