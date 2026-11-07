import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import { ShoppingBag, X, Trash2, ShieldCheck } from 'lucide-react';
import './index.css';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizResult, setQuizResult] = useState(null);

  const placeholderImg = '/images/logo-cover.jpg';

  const products = [
    { id: 1, title: 'شامبو Olaplex', desc: 'لإصلاح الشعر التالف والقوي.', img: placeholderImg, tag: 'عناية بالشعر', price: '300' },
    { id: 2, title: 'شامبو Caffeine', desc: 'لتنشيط فروة الرأس.', img: placeholderImg, tag: 'عناية بالشعر', price: '260' },
    { id: 3, title: 'شامبو Caffeine + Oils', desc: 'تنشيط وتغذية عميقة.', img: placeholderImg, tag: 'عناية بالشعر', price: '300' },
    { id: 4, title: 'شامبو للشعر المعالج', desc: 'للعناية بالشعر المعالج كيميائياً.', img: placeholderImg, tag: 'عناية بالشعر', price: '300' },
    { id: 6, title: 'شامبو رونق الخالي من السلفات', desc: 'ينظف بلطف ويغذي الشعر من الجذور حتى الأطراف.', img: '/images/shampoo.jpg', tag: 'عناية بالشعر', price: '300' },
    { id: 7, title: 'بلسم الشعر (Conditioner)', desc: 'ترطيب وفك تشابك.', img: placeholderImg, tag: 'عناية بالشعر', price: '300' },
    { id: 8, title: 'بلسم للشعر المجعد', desc: 'مخصص للشعر المجعد.', img: placeholderImg, tag: 'عناية بالشعر', price: '350' },
    { id: 9, title: 'Hair Mask', desc: 'ماسك مغذي للشعر.', img: placeholderImg, tag: 'عناية بالشعر', price: '290' },
    { id: 10, title: 'ماسك الشعر والـ Leave-in', desc: 'تغذية وحماية طوال اليوم.', img: placeholderImg, tag: 'عناية بالشعر', price: '300' },
    { id: 11, title: 'ماسك الشعر المغذي', desc: 'إصلاح عميق وتغذية للشعر التالف.', img: '/images/hair-mask.jpg', tag: 'عناية بالشعر', price: '250' },
    { id: 12, title: 'ماسك النيلة الزرقاء', desc: 'ماسك طبيعي للشعر.', img: placeholderImg, tag: 'عناية بالشعر', price: '250' },
    { id: 13, title: 'سيروم الهيالورونيك', desc: 'ترطيب فائق.', img: placeholderImg, tag: 'عناية بالبشرة', price: '200' },
    { id: 14, title: 'سيروم النياسيناميد', desc: 'بشرة نقية وإشراقة طبيعية.', img: placeholderImg, tag: 'عناية بالبشرة', price: '200' },
    { id: 15, title: 'سيروم التفتيح', desc: 'تفتيح البشرة.', img: placeholderImg, tag: 'عناية بالبشرة', price: '250' },
    { id: 16, title: 'Hair Serum', desc: 'سيروم لتغذية الشعر.', img: placeholderImg, tag: 'عناية بالشعر', price: '250' },
    { id: 17, title: 'Hair Toner (صغير)', desc: 'تونر للشعر.', img: placeholderImg, tag: 'عناية بالشعر', price: '220' },
    { id: 18, title: 'Hair Toner (كبير)', desc: 'تونر للشعر.', img: placeholderImg, tag: 'عناية بالشعر', price: '240' },
    { id: 19, title: 'زيت لإنبات الشعر', desc: 'لتنعيم وتكثيف الشعر.', img: placeholderImg, tag: 'زيوت', price: '290' },
    { id: 20, title: 'زيت جوز الهند', desc: 'ترطيب وتغذية.', img: placeholderImg, tag: 'زيوت', price: '40' },
    { id: 21, title: 'زيت للعناية بالشعر', desc: 'زيت مغذي.', img: placeholderImg, tag: 'زيوت', price: '290' },
    { id: 22, title: 'Dry Oil with Shimmer', desc: 'زيت جاف لامع للجسم.', img: placeholderImg, tag: 'زيوت', price: '200' },
    { id: 23, title: 'سكراب الجسم بالكركديه', desc: 'إشراقة طبيعية.', img: placeholderImg, tag: 'عناية بالجسم', price: '200' },
    { id: 24, title: 'سكراب الجسم بالقهوة', desc: 'تنشيط الدورة الدموية.', img: placeholderImg, tag: 'عناية بالجسم', price: '200' },
    { id: 25, title: 'سكراب الجسم بالمانجو', desc: 'ترطيب وانتعاش.', img: placeholderImg, tag: 'عناية بالجسم', price: '200' },
    { id: 26, title: 'Relaxin Scrub', desc: 'استرخاء وتنعيم.', img: placeholderImg, tag: 'عناية بالجسم', price: '200' },
    { id: 27, title: 'سكراب القدمين', desc: 'تقشير وتنعيم.', img: placeholderImg, tag: 'عناية', price: '150' },
    { id: 28, title: 'سكراب القهوة المانجو', desc: 'يقشر وينعم البشرة برائحة منعشة.', img: '/images/scrab.jpg', tag: 'تقشير', price: '200' },
    { id: 29, title: 'كريم + فيتامين سي', desc: 'كريم مشرق للبشرة.', img: placeholderImg, tag: 'عناية بالبشرة', price: '250' },
    { id: 30, title: 'كريم جليسرين', desc: 'ترطيب عميق.', img: placeholderImg, tag: 'ترطيب', price: '200' },
    { id: 31, title: 'كريم للبشرة الدهنية', desc: 'ترطيب خفيف للبشرة الدهنية.', img: placeholderImg, tag: 'عناية بالبشرة', price: '200' },
    { id: 32, title: 'كريم للبشرة الجافة', desc: 'ترطيب غني للبشرة الجافة.', img: placeholderImg, tag: 'عناية بالبشرة', price: '200' },
    { id: 33, title: 'كريم الحبوب', desc: 'للعناية بالحبوب.', img: placeholderImg, tag: 'عناية بالبشرة', price: '120' },
    { id: 34, title: 'كريم القدم المرطب', desc: 'نعومة فائقة وترطيب يدوم 24 ساعة.', img: '/images/foot-cream.jpg', tag: 'ترطيب', price: '196' },
    { id: 35, title: 'Body Lotion Anti Hair Growth', desc: 'ترطيب وتقليل نمو الشعر.', img: placeholderImg, tag: 'عناية بالجسم', price: '300' },
    { id: 36, title: 'Body Lotion (Collagen)', desc: 'ترطيب يومي.', img: placeholderImg, tag: 'عناية بالجسم', price: '250' },
    { id: 37, title: 'واقي الشمس Sunblock', desc: 'حماية طبيعية 100% من الأشعة الضارة مع ترطيب عميق.', img: '/images/sunblock.jpg', tag: 'حماية', price: '320' },
    { id: 38, title: 'واقي شمس (صغير)', desc: 'حماية طبيعية، حجم صغير.', img: placeholderImg, tag: 'حماية', price: '240' },
    { id: 39, title: 'Moisturizing Gel (Large)', desc: 'ترطيب خفيف.', img: placeholderImg, tag: 'عناية بالبشرة', price: '220' },
    { id: 40, title: 'Moisturizing Gel (Small)', desc: 'ترطيب خفيف.', img: placeholderImg, tag: 'عناية بالبشرة', price: '120' },
    { id: 41, title: 'غسول الوجه الفعال', desc: 'ينظف البشرة بعمق دون تجفيفها.', img: '/images/facial-wash.jpg', tag: 'تنظيف', price: '220' },
    { id: 42, title: 'Miscellar Water', desc: 'منظف ومزيل مكياج.', img: placeholderImg, tag: 'تنظيف', price: '160' },
    { id: 43, title: 'Shower Gel', desc: 'تنظيف وانتعاش.', img: placeholderImg, tag: 'تنظيف', price: '196' },
    { id: 44, title: 'صابونة الكبريت الطبيعية', desc: 'تنقي البشرة وتقلل من الحبوب والدهون.', img: '/images/sulpher-soap.jpg', tag: 'تنظيف', price: '80' },
    { id: 45, title: 'ليب جلوس', desc: 'لمعان طبيعي وترطيب عميق للشفاه.', img: '/images/lip-gloss.jpg', tag: 'ترطيب', price: '90' },
    { id: 46, title: 'تنت الشفاه والخدود', desc: 'لون طبيعي يدوم طويلاً.', img: '/images/tint.jpg', tag: 'مكياج', price: '70' },
    { id: 47, title: 'ليب بالم رونق', desc: 'ترطيب يدوم ونعومة فائقة للشفاه.', img: '/images/lip-balm.jpg', tag: 'ترطيب', price: '80' },
    { id: 48, title: 'مزيل طلاء الأظافر', desc: 'يزيل الطلاء بلطف دون إجهاد الأظافر.', img: '/images/nail-remover.jpg', tag: 'عناية', price: '120' },
    { id: 49, title: 'عطور رونق الفاخرة', desc: 'روائح شرقية وفرنسية تدوم طويلاً.', img: '/images/perfume.jpg', tag: 'عطور', price: '400' },
    { id: 50, title: 'برفان (350)', desc: 'عطر فاخر.', img: placeholderImg, tag: 'عطور', price: '350' },
    { id: 51, title: 'برفان (500)', desc: 'عطر فاخر.', img: placeholderImg, tag: 'عطور', price: '500' },
    { id: 52, title: 'مسك الطهارة', desc: 'لمسة من النقاء والإحساس يدوم معك طوال اليوم.', img: placeholderImg, tag: 'عطور', price: '90' },
    { id: 53, title: 'بودي سبلاش مسك', desc: 'رائحة مسك فاخرة.', img: placeholderImg, tag: 'عطور', price: '190' },
    { id: 54, title: 'بودي سبلاش عود', desc: 'رائحة عود فاخرة.', img: placeholderImg, tag: 'عطور', price: '120' },
    { id: 55, title: 'بودي سبلاش الفاخر', desc: 'رائحة تدوم وتعكس شخصيتك.', img: '/images/body-splash.jpg', tag: 'عطور', price: '190' },
    { id: 56, title: 'مزيل العرق رونق', desc: 'حماية تدوم 24 ساعة بروائح مميزة.', img: '/images/deodorant.jpg', tag: 'عناية', price: '200' },
    { id: 57, title: 'توك الشعر (ستان)', desc: 'إكسسوار للشعر.', img: placeholderImg, tag: 'إكسسوارات', price: '0' },
    { id: 58, title: 'بونية الشعر (ستان)', desc: 'إكسسوار للشعر.', img: placeholderImg, tag: 'إكسسوارات', price: '0' },
    { id: 59, title: 'فرشاة شعر', desc: 'فرشاة شعر خشبية.', img: placeholderImg, tag: 'إكسسوارات', price: '0' },
    { id: 60, title: 'شراب سيليكون', desc: 'أداة تصفيف شعر.', img: placeholderImg, tag: 'إكسسوارات', price: '0' },
    { id: 61, title: 'مبرد القدم', desc: 'أداة للعناية بالقدم.', img: placeholderImg, tag: 'إكسسوارات', price: '0' },
    { id: 62, title: 'ليف مغربي', desc: 'ليف طبيعي للاستحمام.', img: placeholderImg, tag: 'إكسسوارات', price: '0' },
    { id: 63, title: 'فازلين', desc: 'ترطيب فائق.', img: placeholderImg, tag: 'ترطيب', price: '25' },
    { id: 65, title: 'Hair Mask and leave-in', desc: 'تغذية وحماية طوال اليوم.', img: placeholderImg, tag: 'عناية بالشعر', price: '300' },
  ];

  const quizQuestions = [
    { question: "ما هو هدفك الأول في الروتين اليومي؟", options: [{ text: "حماية من الشمس وترطيب", result: "واقي الشمس Sunblock", img: "/images/sunblock.jpg" }, { text: "لمعان وترطيب للشفاه", result: "ليب جلوس", img: "/images/lip-gloss.jpg" }, { text: "تنظيف عميق وتقليل الحبوب", result: "غسول الوجه الفعال", img: "/images/facial-wash.jpg" }] },
    { question: "كيف تصفين حالة شعرك؟", options: [{ text: "تالف ومتقصف", result: "ماسك الشعر المغذي", img: "/images/hair-mask.jpg" }, { text: "دهني وأحتاج تنظيف لطيف", result: "شامبو رونق", img: "/images/shampoo.jpg" }, { text: "عادي وأحتاج رائحة تدوم", result: "عطور رونق", img: "/images/perfume.jpg" }] }
  ];

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) { return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item); }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const checkoutWhatsApp = () => {
    if (cart.length === 0) return alert('السلة فارغة!');
    let msg = 'مرحباً دكتورة، أود طلب:\n';
    cart.forEach((item, i) => { msg += `${i + 1}. ${item.title} (${item.qty}) - السعر: ${item.price !== '0' ? item.price + ' ج.م' : 'عند الطلب'}\n`; });
    window.open(`https://wa.me/201030970251?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleQuizAnswer = (option) => {
    if (quizStep < quizQuestions.length - 1) { setQuizStep(quizStep + 1); } else { setQuizResult(option); }
  };

  const HomePage = () => (
    <>
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)', color: '#5a3e36', fontSize: '12px', fontWeight: 'bold', marginBottom: '20px' }}>
          <ShieldCheck size={16} color="#d4af37" /> تركيبات صيدلانية آمنة 100%
        </span>
        <h2 style={{ fontSize: '42px', fontWeight: 800, color: '#5a3e36', marginBottom: '20px', lineHeight: 1.3 }}>
          إشراقة طبيعية تليق بجمالكِ مع رونق
        </h2>
        <p style={{ color: '#7a6862', fontSize: '16px', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
          مستحضرات عناية بالبشرة والشعر مُصنعة بيد دكتورة صيدلانية متخصصة. زيوت وسيرومات بتركيبات نقية وطبيعية تمنحكِ الأمان والنتائج الحقيقية.
        </p>
      </section>

      <section style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#fff', marginBottom: '20px' }}>
  <h2 style={{ fontSize: '36px', color: '#5a3e36', marginBottom: '10px' }}>Welcome to Rawnak 🌿</h2>
  <h3 style={{ fontSize: '24px', color: '#d4af37', marginBottom: '20px' }}>جمالك يبدأ من الطبيعة</h3>
  <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '16px', lineHeight: '1.8', color: '#7a6862', marginBottom: '15px' }}>
    في Rawnak بنقدم لك منتجات للعناية بالبشرة والشعر والجسم بمكونات طبيعية 100%، من إعداد دكتورة صيدلانية بكل اهتمام.
  </p>
  <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '16px', lineHeight: '1.8', color: '#7a6862', marginBottom: '15px' }}>
    مش عارفة إيه المناسب لبشرتك؟ ابعتي لنا نوع بشرتك والمشكلة اللي بتواجهيها، وإحنا هنساعدك تختاري المنتجات المناسبة ليكي.
  </p>
  <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '16px', lineHeight: '1.8', color: '#7a6862', marginBottom: '15px' }}>
    وعندك منتج معين نفسك فيه؟ ابعتي لنا طلبك وإحنا نوفرهولك!
  </p>
  <p style={{ marginTop: '20px', fontWeight: 'bold', color: '#5a3e36', fontSize: '18px' }}>Rawnak – Your Beauty, Our Passion. 🌸</p>
  <p style={{ fontWeight: 'bold', color: '#d4af37', fontSize: '18px' }}>جمالك طبيعي... وعنايتك تبدأ معانا!</p>
</section>

<section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', padding: '40px 20px', flexWrap: 'wrap' }}>
  <div style={{ flex: 1, minWidth: '300px', textAlign: 'center' }}>
    <img src="/images/rawnak-collection.jpg" alt="Rawnak Collection" style={{ width: '100%', maxWidth: '500px', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }} />
    <h3 style={{ textAlign: 'center', marginTop: '15px', color: '#5a3e36', fontSize: '20px' }}>منتجات رونق</h3>
  </div>
  <div style={{ flex: 1, minWidth: '300px' }}>
    <h2 style={{ fontSize: '32px', color: '#5a3e36', marginBottom: '20px' }}>ليه تختاري رونق؟</h2>
    <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#7a6862', marginBottom: '20px' }}>تأسست رونق برؤية صيدلانية متخصصة تهدف لتقديم البديل الطبيعي الفاخر والآمن لمنتجات العناية بالبشرة والشعر.</p>
    <ul style={{ listStyle: 'none', padding: 0, fontSize: '16px', color: '#5a3e36', fontWeight: 'bold' }}>
      <li style={{ marginBottom: '10px' }}>✅ تركيبات آمنة جداً ومختبرة</li>
      <li style={{ marginBottom: '10px' }}>✅ مكونات طبيعية 100%</li>
      <li style={{ marginBottom: '10px' }}>✅ إشراف دكتورة صيدلانية</li>
      <li>✅ نتائج حقيقية ومضمونة</li>
    </ul>
  </div>
</section>

      <section style={{ backgroundColor: '#fff', padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', color: '#5a3e36', marginBottom: '20px' }}>عن الدكتورة</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#f4eae4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '60px' }}>👩‍⚕️</div>
          <div style={{ maxWidth: '500px', textAlign: 'right' }}>
            <h3 style={{ fontSize: '24px', color: '#d4af37', marginBottom: '10px' }}>د. منار فتحي</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#7a6862' }}>دكتورة صيدلانية متخصصة، مؤسسة براند رونق. بدأت رحلتها بشغف كبير لتقديم منتجات طبيعية آمنة وفعالة، مستخدمة خبرتها الصيدلانية لضمان أعلى معايير الجودة والأمان في كل منتج.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', color: '#5a3e36', marginBottom: '10px' }}>اختاري روتينك المناسب</h2>
        <p style={{ color: '#7a6862', marginBottom: '30px' }}>أجيبي على الأسئلة البسيطة عشان نساعدك تختاري المنتجات المثالية ليكي.</p>
        {!quizResult ? (
          <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: 'rgba(255,255,255,0.6)', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#d4af37', marginBottom: '20px' }}>{quizQuestions[quizStep].question}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quizQuestions[quizStep].options.map((opt, i) => (
                <button key={i} onClick={() => handleQuizAnswer(opt)} style={{ padding: '15px', borderRadius: '10px', border: '1px solid #ddd', backgroundColor: '#fcf8f5', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', color: '#5a3e36' }}>{opt.text}</button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: 'rgba(255,248,240,0.9)', padding: '30px', borderRadius: '20px', border: '2px solid #d4af37' }}>
            <h3 style={{ color: '#5a3e36', marginBottom: '20px' }}>المنتج المثالي ليكي هو:</h3>
            <img src={quizResult.img} alt={quizResult.result} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', marginBottom: '15px' }} />
            <h4 style={{ fontSize: '22px', color: '#d4af37' }}>{quizResult.result}</h4>
            <button onClick={() => { setQuizStep(0); setQuizResult(null); }} style={{ marginTop: '20px', backgroundColor: '#5a3e36', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>إعادة الاختبار</button>
          </div>
        )}
      </section>

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#5a3e36' }}>مجموعة رونق الحصرية</h3>
          <p style={{ fontSize: '14px', color: '#7a6862', marginTop: '5px' }}>مصنوعة بحب وعناية صيدلانية</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {products.map((item) => (
            <div key={item.id} className="product-card" style={{ borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '320px', overflow: 'hidden', backgroundColor: '#fff' }}>
                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px', backgroundColor: '#fff', borderRadius: '15px' }} />
                <span style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#5a3e36', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>{item.tag}</span>
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h4 style={{ fontWeight: 'bold', color: '#5a3e36', fontSize: '16px', marginBottom: '5px' }}>{item.title}</h4>
                <p style={{ fontSize: '16px', color: '#d4af37', fontWeight: 'bold', marginBottom: '10px' }}>{item.price !== '0' ? `${item.price} ج.م` : 'السعر عند الطلب'}</p>
                <p style={{ fontSize: '13px', color: '#7a6862', lineHeight: '1.6', marginBottom: '20px', flexGrow: 1 }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => addToCart(item)} style={{ flex: 1, padding: '10px', borderRadius: '15px', border: 'none', backgroundColor: '#d4af37', color: 'white', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>🛒 إضافة</button>
                  <Link to={`/product/${item.id}`} style={{ flex: 1, padding: '10px', borderRadius: '15px', border: '2px solid #5a3e36', backgroundColor: 'transparent', color: '#5a3e36', fontWeight: 'bold', fontSize: '13px', textAlign: 'center', textDecoration: 'none' }}>التفاصيل</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(212, 175, 55, 0.2)', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '2px solid #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg style={{ width: '24px', height: '24px', fill: '#5a3e36' }} viewBox="0 0 100 100">
                <path d="M50 20 C55 35 70 35 70 45 C70 55 55 55 50 75 C45 55 30 55 30 45 C30 35 45 35 50 20 Z" fill="none" stroke="#5a3e36" strokeWidth="3"/>
                <circle cx="50" cy="45" r="4" fill="#d4af37"/>
              </svg>
            </div>
            <div>
              <h1 style={{ fontWeight: 800, fontSize: '20px', color: '#5a3e36', margin: 0, lineHeight: 1 }}>رونق</h1>
              <span style={{ fontSize: '9px', letterSpacing: '2px', color: '#7a6862', textTransform: 'uppercase', display: 'block', marginTop: '4px' }}>RAWNAK SKIN & HAIR</span>
            </div>
          </Link>
          <button onClick={() => setIsCartOpen(true)} style={{ position: 'relative', padding: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#5a3e36' }}>
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <span style={{ position: 'absolute', top: '0', right: '0', backgroundColor: '#d4af37', color: 'white', fontSize: '10px', fontWeight: 'bold', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{totalItems}</span>
            )}
          </button>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

      {isCartOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} onClick={() => setIsCartOpen(false)} />
          <div style={{ position: 'relative', width: '100%', maxWidth: '350px', backgroundColor: '#fff', height: '100%', boxShadow: '0 0 20px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', padding: '24px', zIndex: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '20px', color: '#5a3e36', margin: 0 }}>سلة المشتريات</h3>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}><X size={24} /></button>
            </div>
            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {cart.length === 0 ? (
                <p style={{ textAlign: 'center', fontSize: '14px', color: '#999', marginTop: '40px' }}>السلة فارغة حالياً</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#fcf8f5', padding: '10px', borderRadius: '12px' }}>
                    <img src={item.img} alt={item.title} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flexGrow: 1 }}>
                      <h5 style={{ fontWeight: 'bold', fontSize: '13px', color: '#5a3e36', margin: 0 }}>{item.title}</h5>
                      <span style={{ fontSize: '12px', color: '#666' }}>الكمية: {item.qty} - السعر: {item.price !== '0' ? item.price : 'عند الطلب'}</span>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4d4f' }}><Trash2 size={18} /></button>
                  </div>
                ))
              )}
            </div>
            <div style={{ paddingTop: '20px', borderTop: '1px solid #eee' }}>
              <button onClick={checkoutWhatsApp} disabled={cart.length === 0} style={{ width: '100%', padding: '15px', backgroundColor: cart.length === 0 ? '#ccc' : '#25D366', color: 'white', border: 'none', borderRadius: '30px', fontWeight: 'bold', fontSize: '16px', cursor: cart.length === 0 ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>إرسال الطلب عبر واتساب</button>
            </div>
          </div>
        </div>
      )}

      <footer style={{ backgroundColor: '#5a3e36', color: 'white', padding: '30px 20px', textAlign: 'center', marginTop: 'auto' }}>
        <p style={{ fontSize: '13px', opacity: 0.9, margin: 0 }}>جميع الحقوق محفوظة &copy; 2026 براند رونق - Rawnak Skin & Hair Care</p>
      </footer>
    </div>
  );
}

export default App;









