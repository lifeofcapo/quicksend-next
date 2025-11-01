import { Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto text-center max-w-3xl">
        <h2 className="text-4xl font-bold mb-8">Свяжитесь с нами!</h2>
        <Mail className="w-16 h-16 text-blue-600 mx-auto mb-6" />
        <a href="mailto:quicksendcontact@gmail.com" className="text-2xl font-semibold text-blue-600 hover:text-blue-700 transition block mb-4">
          quicksendcontact@gmail.com
        </a>
        <p className="text-gray-600 text-lg">
          Отправляйте нам предложения по улучшению, предложения о работе и сообщения об ошибках!
        </p>
      </div>
    </section>
  );
}