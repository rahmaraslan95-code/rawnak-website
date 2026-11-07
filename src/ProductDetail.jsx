import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const placeholderImg = '/images/logo-cover.jpg';

  const allProducts = [
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

  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) return <div style={{ textAlign: 'center', padding: '50px' }}>جاري التحميل...</div>;

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);
    if (existing) { existing.qty += 1; } else { cart.push({ ...product, qty: 1 }); }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('تمت إضافة المنتج للسلة!');
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Cairo, sans-serif' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#5a3e36', fontWeight: 'bold' }}>← العودة للرئيسية</Link>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginTop: '20px', backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <div style={{ flex: 1, minWidth: '300px', textAlign: 'center' }}>
           <img src={product.img} alt={product.title} style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', objectFit: 'contain', backgroundColor: '#fff' }} />
        </div>
        <div style={{ flex: 1, minWidth: '300px' }}>
           <h1 style={{ fontSize: '32px', color: '#5a3e36', marginBottom: '10px' }}>{product.title}</h1>
           <span style={{ backgroundColor: '#d4af37', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '14px' }}>{product.tag}</span>
           <h2 style={{ color: '#d4af37', fontSize: '28px', marginTop: '10px' }}>{product.price !== '0' ? `${product.price} ج.م` : 'السعر عند الطلب'}</h2>
           <h3 style={{ color: '#5a3e36', marginTop: '20px', marginBottom: '10px' }}>الوصف:</h3>
           <p style={{ color: '#7a6862', lineHeight: '1.8' }}>{product.longDesc || product.desc}</p>
           <h3 style={{ color: '#5a3e36', marginTop: '20px', marginBottom: '10px' }}>المكونات:</h3>
           <p style={{ color: '#7a6862', lineHeight: '1.8' }}>{product.ingredients || 'مكونات طبيعية مختارة بعناية.'}</p>
           <h3 style={{ color: '#5a3e36', marginTop: '20px', marginBottom: '10px' }}>طريقة الاستخدام:</h3>
           <p style={{ color: '#7a6862', lineHeight: '1.8' }}>{product.usage || 'يستخدم حسب الحاجة.'}</p>
           <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
              <button onClick={() => addToCart(product)} style={{ flex: 1, padding: '15px', background: '#d4af37', color: 'white', border: 'none', borderRadius: '30px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>🛒 إضافة للسلة</button>
              <a href={`https://wa.me/201030970251?text=أريد طلب ${product.title}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: '15px', background: '#25D366', color: 'white', border: 'none', borderRadius: '30px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', textAlign: 'center', textDecoration: 'none' }}>💬 طلب واتساب</a>
           </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;








