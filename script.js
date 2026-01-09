// Dine unike Supabase-detaljer
const SUPABASE_URL = 'https://zwiexzlqsqwaamhpbwsm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3aWV4emxxc3F3YWFtaHBid3NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NjExNzcsImV4cCI6MjA4MzUzNzE3N30.pr8mckRDD9Ij_tUIOD6BxvIWordNFmm2zhGKmMl1S_s';

// Koble til Supabase-klienten
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Funksjon for å hente data fra databasen
async function hentEcuData() {
    const { data: ecu_list, error } = await _supabase
        .from('ecu_database')
        .select('*');

    if (error) {
        console.error("Kunne ikke hente data:", error.message);
        return;
    }

    // Vis dataene i tabellen med en gang siden lastes
    oppdaterTabell(ecu_list);

    // Aktiver søkefunksjonen
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        const sokestreng = searchInput.value.toLowerCase();
        const filtrertListe = ecu_list.filter(item => {
            return (
                item.brand.toLowerCase().includes(sokestreng) ||
                item.ecu_type.toLowerCase().includes(sokestreng) ||
                item.hw_number.toLowerCase().includes(sokestreng)
            );
        });
        oppdaterTabell(filtrertListe);
    });
}

// Funksjon som tegner tabellen på skjermen
function oppdaterTabell(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Tømmer tabellen først

    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">Ingen treff funnet...</td></tr>';
        return;
    }

    data.forEach(ecu => {
        const rad = `
            <tr>
                <td>${ecu.brand}</td>
                <td>${ecu.ecu_type}</td>
                <td>${ecu.hw_number}</td>
                <td>${ecu.processor || 'Ikke oppgitt'}</td>
            </tr>
        `;
        tableBody.innerHTML += rad;
    });
}

// Kjør funksjonen når nettsiden åpnes
document.addEventListener('DOMContentLoaded', hentEcuData);