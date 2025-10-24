function CalledElement(props) {
  const {
    element
  } = props;
  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const getValue = () => {
    return getBusinessObject(element).get('calledElement');
  };
  const setValue = value => {
    modeling.updateProperties(element, {
      calledElement: value || ''
    });
  };

  const [options, setOptions] = useState([
    { value: '', label: translate('<Selecionar formulário>') }
  ]);

  useEffect(() => {
    async function loadFormOptions() {
      try {
        const token = sessionStorage.getItem("access_token");
        const res = await fetch(
          'https://dev.simodapp.com:2083/formulario?tipoFormulario=FORM',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Tenant-Id': 'simod',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (!res.ok) {
          throw new Error(`Erro na requisição: ${res.status}`);
        }

        const data = await res.json();
        const remoteOptions = data.map(f => ({
          value: f.id,
          label: f.nome
        }));

        setOptions(prev => [...prev, ...remoteOptions]);
      } catch (err) {
        console.error('Erro ao carregar formulários', err);
      }
    }

    loadFormOptions();
  }, []);

  return jsx(SelectEntry, {
    element: element,
    id: "calledElement",
    label: translate('Called element'),
    getValue: getValue,
    setValue: setValue,
    debounce: debounce,
    getOptions: () => options
  });
}


function CalledElementVersion(props) {
  const {
    element
  } = props;
  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');
  const getValue = () => {
    return getBusinessObject(element).get('camunda:calledElementVersion');
  };
  const setValue = value => {
    modeling.updateProperties(element, {
      calledElementVersion: value
    });
  };

  const [options, setOptions] = useState([
    { value: '', label: translate('<Selecionar formulário>') }
  ]);

  useEffect(() => {
    async function loadFormOptions() {
      try {
        const token = sessionStorage.getItem("access_token");
        const key = getBusinessObject(element).get('calledElement');
        const res = await fetch(
          `https://dev.simodapp.com:2083/processo/api/v1/process-definition?key=${key}&active=true&suspended=false&latestVersion=true`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Tenant-Id': 'simod',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (!res.ok) {
          throw new Error(`Erro na requisição: ${res.status}`);
        }

        const data = await res.json();
        const remoteOptions = data.map(f => ({
          value: f.id,
          label: f.nome
        }));

        setOptions(prev => [...prev, ...remoteOptions]);
      } catch (err) {
        console.error('Erro ao carregar formulários', err);
      }
    }

    loadFormOptions();
  }, []);

  return jsx(SelectEntry, {
    element: element,
    id: "calledElementVersion",
    label: translate('Version'),
    getValue: getValue,
    setValue: setValue,
    debounce: debounce,
    getOptions: () => options
  });
}
