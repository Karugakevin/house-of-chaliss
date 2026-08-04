interface Customer {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  created_at: string;
  id: string;
}

interface Props {
  customer: Customer;
}

export default function CustomerProfile({
  customer,
}: Props) {

  return (

    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-xl font-semibold mb-8">

        Customer Profile

      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        <div>

          <p className="text-sm uppercase text-gray-500">

            Full Name

          </p>

          <p className="font-semibold text-lg mt-2">

            {customer.first_name} {customer.last_name}

          </p>

        </div>

        <div>

          <p className="text-sm uppercase text-gray-500">

            Email

          </p>

          <p className="mt-2">

            {customer.email}

          </p>

        </div>

        <div>

          <p className="text-sm uppercase text-gray-500">

            Phone

          </p>

          <p className="mt-2">

            {customer.phone ?? "-"}

          </p>

        </div>

        <div>

          <p className="text-sm uppercase text-gray-500">

            Joined

          </p>

          <p className="mt-2">

            {new Date(
              customer.created_at
            ).toLocaleDateString()}

          </p>

        </div>

        <div className="md:col-span-2">

          <p className="text-sm uppercase text-gray-500">

            Customer ID

          </p>

          <p className="mt-2 font-mono break-all">

            {customer.id}

          </p>

        </div>

      </div>

    </div>

  );

}