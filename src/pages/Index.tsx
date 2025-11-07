import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [calcArea, setCalcArea] = useState('');
  const [calcType, setCalcType] = useState('facade');
  const [calcThickness, setCalcThickness] = useState('60');
  const [calcResult, setCalcResult] = useState<number | null>(null);

  const calculatePrice = () => {
    const area = parseFloat(calcArea);
    if (isNaN(area) || area <= 0) {
      alert('Введите корректную площадь');
      return;
    }

    const prices: Record<string, Record<string, number>> = {
      facade: { '40': 1200, '60': 1500, '80': 1800, '100': 2100 },
      brick: { '60': 1800, '80': 2200 },
      corner: { '40': 450, '60': 550 }
    };

    const pricePerM2 = prices[calcType][calcThickness] || 1500;
    const total = area * pricePerM2;
    setCalcResult(total);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'products', 'advantages', 'technology', 'calculator', 'projects', 'contacts'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const products = [
    {
      title: 'Фасадные термопанели',
      description: 'Современное решение для утепления фасадов зданий',
      specs: ['Толщина: 40-100 мм', 'Теплопроводность: 0.032 Вт/(м·К)', 'Класс горючести: Г1'],
      image: 'https://cdn.poehali.dev/projects/909fb9d1-68f0-4c0c-9f78-8c63320b141e/files/2abf31c5-1202-4045-858b-2e4374bac67f.jpg'
    },
    {
      title: 'Панели под кирпич',
      description: 'Декоративные термопанели с имитацией кирпичной кладки',
      specs: ['Толщина: 60-80 мм', 'Морозостойкость: F100', 'Срок службы: 50+ лет'],
      image: 'https://cdn.poehali.dev/projects/909fb9d1-68f0-4c0c-9f78-8c63320b141e/files/2abf31c5-1202-4045-858b-2e4374bac67f.jpg'
    },
    {
      title: 'Угловые элементы',
      description: 'Специальные элементы для оформления углов здания',
      specs: ['Толщина: 40-60 мм', 'Размер: 300x150 мм', 'Защита от влаги'],
      image: 'https://cdn.poehali.dev/projects/909fb9d1-68f0-4c0c-9f78-8c63320b141e/files/c853fc6d-3fa1-4584-9b9e-64249aa28366.jpg'
    }
  ];

  const advantages = [
    { icon: 'Zap', title: 'Энергоэффективность', description: 'Снижение затрат на отопление до 60%' },
    { icon: 'Shield', title: 'Долговечность', description: 'Срок службы более 50 лет' },
    { icon: 'Droplet', title: 'Влагостойкость', description: 'Защита от влаги и конденсата' },
    { icon: 'Flame', title: 'Пожаробезопасность', description: 'Класс горючести Г1-Г2' },
    { icon: 'Snowflake', title: 'Морозостойкость', description: 'Выдерживает перепады температур' },
    { icon: 'Hammer', title: 'Простота монтажа', description: 'Быстрая установка без специального оборудования' }
  ];

  const projects = [
    {
      title: 'Жилой комплекс "Северный"',
      location: 'Москва',
      area: '12 000 м²',
      image: 'https://cdn.poehali.dev/projects/909fb9d1-68f0-4c0c-9f78-8c63320b141e/files/57c905b1-5791-4a2f-820b-a91d0d45f942.jpg'
    },
    {
      title: 'Торговый центр',
      location: 'Санкт-Петербург',
      area: '8 500 м²',
      image: 'https://cdn.poehali.dev/projects/909fb9d1-68f0-4c0c-9f78-8c63320b141e/files/57c905b1-5791-4a2f-820b-a91d0d45f942.jpg'
    },
    {
      title: 'Частный дом',
      location: 'Казань',
      area: '450 м²',
      image: 'https://cdn.poehali.dev/projects/909fb9d1-68f0-4c0c-9f78-8c63320b141e/files/57c905b1-5791-4a2f-820b-a91d0d45f942.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Layers" size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">ТЕРМОПАН</span>
            </div>
            <div className="hidden md:flex gap-6">
              {['Главная', 'Продукция', 'Преимущества', 'Технология', 'Калькулятор', 'Проекты', 'Контакты'].map((item, idx) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(['hero', 'products', 'advantages', 'technology', 'calculator', 'projects', 'contacts'][idx])}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === ['hero', 'products', 'advantages', 'technology', 'calculator', 'projects', 'contacts'][idx]
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <Button onClick={() => scrollToSection('contacts')}>Связаться</Button>
          </div>
        </div>
      </nav>

      <section id="hero" className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Производство термопанелей из пенополистирола
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Современные энергоэффективные решения для утепления и отделки фасадов. Качество, проверенное временем.
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => scrollToSection('products')} className="gap-2">
                  Смотреть продукцию <Icon name="ArrowRight" size={20} />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('contacts')}>
                  Получить консультацию
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">10+</div>
                  <div className="text-sm text-muted-foreground">лет на рынке</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">250+</div>
                  <div className="text-sm text-muted-foreground">проектов</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">99%</div>
                  <div className="text-sm text-muted-foreground">довольных клиентов</div>
                </div>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img
                src="https://cdn.poehali.dev/projects/909fb9d1-68f0-4c0c-9f78-8c63320b141e/files/2abf31c5-1202-4045-858b-2e4374bac67f.jpg"
                alt="Термопанели"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Icon name="Award" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <div className="font-bold">Сертифицировано</div>
                    <div className="text-sm text-muted-foreground">ГОСТ и ISO</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Наша продукция</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Широкий ассортимент термопанелей для любых задач
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <div className="space-y-2">
                    {product.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-primary" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6" variant="outline">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="advantages" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Преимущества наших панелей</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Почему выбирают термопанели из пенополистирола
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((item, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-xl bg-white hover:bg-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                  <Icon name={item.icon} size={28} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-muted-foreground group-hover:text-white/90 transition-colors">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="technology" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Технология производства</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Мы используем современное оборудование и проверенные технологии для создания высококачественных термопанелей.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'Подготовка сырья', desc: 'Качественный пенополистирол от проверенных поставщиков' },
                  { title: 'Формование', desc: 'Автоматизированная линия формования панелей' },
                  { title: 'Нанесение покрытия', desc: 'Декоративный слой с защитными свойствами' },
                  { title: 'Контроль качества', desc: 'Многоступенчатая проверка готовой продукции' }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://cdn.poehali.dev/projects/909fb9d1-68f0-4c0c-9f78-8c63320b141e/files/c853fc6d-3fa1-4584-9b9e-64249aa28366.jpg"
                alt="Технология"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="calculator" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Калькулятор стоимости</h2>
              <p className="text-lg text-muted-foreground">
                Рассчитайте примерную стоимость термопанелей для вашего объекта
              </p>
            </div>
            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">Тип термопанели</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setCalcType('facade')}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        calcType === 'facade'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-semibold">Фасадные термопанели</div>
                      <div className="text-sm text-muted-foreground">От 1200 ₽/м²</div>
                    </button>
                    <button
                      onClick={() => setCalcType('brick')}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        calcType === 'brick'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-semibold">Панели под кирпич</div>
                      <div className="text-sm text-muted-foreground">От 1800 ₽/м²</div>
                    </button>
                    <button
                      onClick={() => setCalcType('corner')}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        calcType === 'corner'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-semibold">Угловые элементы</div>
                      <div className="text-sm text-muted-foreground">От 450 ₽/шт</div>
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3">Толщина панели (мм)</label>
                    <div className="grid grid-cols-2 gap-2">
                      {calcType === 'facade' && ['40', '60', '80', '100'].map((thickness) => (
                        <button
                          key={thickness}
                          onClick={() => setCalcThickness(thickness)}
                          className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                            calcThickness === thickness
                              ? 'border-primary bg-primary text-white'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {thickness} мм
                        </button>
                      ))}
                      {calcType === 'brick' && ['60', '80'].map((thickness) => (
                        <button
                          key={thickness}
                          onClick={() => setCalcThickness(thickness)}
                          className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                            calcThickness === thickness
                              ? 'border-primary bg-primary text-white'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {thickness} мм
                        </button>
                      ))}
                      {calcType === 'corner' && ['40', '60'].map((thickness) => (
                        <button
                          key={thickness}
                          onClick={() => setCalcThickness(thickness)}
                          className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                            calcThickness === thickness
                              ? 'border-primary bg-primary text-white'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {thickness} мм
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      {calcType === 'corner' ? 'Количество элементов' : 'Площадь (м²)'}
                    </label>
                    <input
                      type="number"
                      value={calcArea}
                      onChange={(e) => setCalcArea(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg"
                      placeholder={calcType === 'corner' ? 'Введите количество' : 'Введите площадь'}
                    />
                  </div>

                  <Button onClick={calculatePrice} className="w-full gap-2" size="lg">
                    <Icon name="Calculator" size={20} />
                    Рассчитать стоимость
                  </Button>

                  {calcResult !== null && (
                    <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary animate-scale-in">
                      <div className="text-sm text-muted-foreground mb-2">Примерная стоимость:</div>
                      <div className="text-3xl font-bold text-primary mb-3">
                        {calcResult.toLocaleString('ru-RU')} ₽
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Цена указана без учета доставки и монтажа
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    Расчет является предварительным. Для точной стоимости свяжитесь с нашими менеджерами. 
                    Цена зависит от объема заказа, сложности монтажа и региона доставки.
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="projects" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Реализованные проекты</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Наши термопанели украшают и утепляют здания по всей России
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <Card key={idx} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Icon name="MapPin" size={16} />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Ruler" size={16} />
                    <span>Площадь: {project.area}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Свяжитесь с нами</h2>
              <p className="text-lg text-muted-foreground">
                Получите консультацию по выбору термопанелей и расчет стоимости
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6">Контактная информация</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Телефон</div>
                      <a href="tel:+74951234567" className="text-muted-foreground hover:text-primary transition-colors">+79198005551</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <a href="mailto:info@termopanel.ru" className="text-muted-foreground hover:text-primary transition-colors">montag-163@mail.ru</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Адрес</div>
                      <div className="text-muted-foreground">
                        г. Москва, ул. Производственная, д. 12
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Режим работы</div>
                      <div className="text-muted-foreground">
                        Пн-Пт: 9:00 - 18:00<br />Сб-Вс: выходной
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6">Форма обратной связи</h3>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.'); }}>
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваше имя</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Иван Иванов"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+7 (___) ___-__-__"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="example@mail.ru"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Сообщение</label>
                    <textarea
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      rows={4}
                      placeholder="Расскажите о вашем проекте..."
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    Отправить заявку <Icon name="Send" size={18} />
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Layers" size={24} className="text-white" />
                </div>
                <span className="text-xl font-bold">ТермоПанель</span>
              </div>
              <p className="text-white/70 text-sm">
                Производство качественных термопанелей из пенополистирола с 2009 года
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Продукция</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-primary transition-colors">Фасадные панели</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Угловые элементы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Цокольные панели</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Аксессуары</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Производство</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Сертификаты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Вакансии</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-primary transition-colors">Инструкции</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Гарантия</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white/70">
              © 2024 ТермоПанель. Все права защищены.
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Icon name="Phone" size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Icon name="Mail" size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Icon name="MessageCircle" size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;